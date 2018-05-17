import { IRestResponse } from "typed-rest-client/RestClient";
import { Cat } from "../../models/cat/Cat";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class CatService extends BaseService {
  static getCat(id : number, callback: (err: any, result: Cat | null) => void): void {
    this.rest.get<Cat>("cat/" + id).then(
      (res: IRestResponse<Cat>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getCat response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllCats(callback: (err: any, result: Cat [] | null) => void): void {
    this.rest.getAll<Cat>("cat").then(
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

  static createCat(cat : Cat, callback: (err: any) => void): void {
    this.rest.create<Cat>("cat", cat).then(
      (res: IRestResponse<Cat>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("createCat response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}