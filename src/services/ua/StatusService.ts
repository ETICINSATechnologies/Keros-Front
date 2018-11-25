import {IRestResponse} from "typed-rest-client/RestClient";
import {BaseService} from "../common/BaseService";
import {Status} from "../../models/ua/Status";
import * as winston from "winston";

export class StatusService extends BaseService {

  private static cacheStatusValues: Status[] | null = null;
  private static cacheStatusExpires: number = 0;

  static getAllStatus(callback: (err: any, result: Status[] | null) => void): void {
    if (Date.now() < this.cacheStatusExpires) {
      callback(null, this.cacheStatusValues);
    } else {
      this.rest.getAll<Status>("ua/status", this.defaultHeaders()).then(
        (res: IRestResponse<Status[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheStatusValues = res.result;
          this.cacheStatusExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getStatus(id: number | undefined, callback: (err: any, result: Status | null) => void): void {
    this.rest.get<Status>("ua/status/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Status>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}