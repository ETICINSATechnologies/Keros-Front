import { IRestResponse } from "typed-rest-client/RestClient";
import { Cat } from "../../models/cat/Cat";
import { BaseService } from "../BaseService";
import * as winston from "winston";

export class CatService extends BaseService {
  static getAllCats(callback: (err: any, result: Cat [] | null) => void): void {
    this.rest.get<Cat []>("cat").then(
      (res: IRestResponse<Cat []>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllCats response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}