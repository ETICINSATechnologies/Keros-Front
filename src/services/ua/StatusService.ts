import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Status } from "../../models/ua/Status";

export class StatusService extends BaseService {
  static getAllStatus(callback: (err: any, result: Status[] | null) => void): void {
    this.rest.getAll<Status>("status").then(
      (res: IRestResponse<Status[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllStatus response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getStatus(id: number | undefined, callback: (err: any, result: Status | null) => void): void {
    this.rest.get<Status>("status/" + id).then(
      (res: IRestResponse<Status>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getStatus response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}