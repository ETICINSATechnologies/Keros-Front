import { IRestResponse } from "typed-rest-client/RestClient";
import { Gender } from "../../models/core/Gender";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class GenderService extends BaseService {
  static getAllGenders(callback: (err: any, result: Gender[] | null) => void): void {
    this.rest.getAll<Gender>("core/gender").then(
      (res: IRestResponse<Gender[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllGenders response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}