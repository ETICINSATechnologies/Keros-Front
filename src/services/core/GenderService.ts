import { IRestResponse } from "typed-rest-client/RestClient";
import { Gender } from "../../models/core/Gender";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class GenderService extends BaseService {
  private static cacheGendersValues: Gender[] | null = null;
  private static cacheGendersExpires = 0;

  static getAllGenders(callback: (err: any, result: Gender[] | null) => void): void {
    if (Date.now() < this.cacheGendersExpires) {
      callback(null, this.cacheGendersValues);
    } else {
      this.rest.getAll<Gender>("core/gender", this.defaultHeaders()).then(
        (res: IRestResponse<Gender[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheGendersValues = res.result;
          this.cacheGendersExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }
}