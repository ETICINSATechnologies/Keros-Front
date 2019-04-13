import { BaseService } from "../common/BaseService";
import { Pole } from "../../models/core/Pole";
import { IRestResponse } from "typed-rest-client/RestClient";
import * as winston from "winston";

export class PoleService extends BaseService {

  private static cachePolesValues: Pole[] | null = null;
  private static cachePolesExpires = 0;

  static getAllPoles(callback: (err: any, result: Pole[] | null) => void): void {
    if (Date.now() < this.cachePolesExpires) {
      callback(null, this.cachePolesValues);
    } else {
      this.rest.getAll<Pole>("core/pole", this.defaultHeaders()).then(
        (res: IRestResponse<Pole[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cachePolesValues = res.result;
          this.cachePolesExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getPole(id: number | undefined, callback: (err: any, result: Pole | null) => void): void {
    this.rest.get<Pole>("core/pole/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Pole>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}