import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Field } from "../../models/ua/Field";

export class FieldService extends BaseService {
  static getAllFields(callback: (err: any, result: Field[] | null) => void): void {
    this.rest.getAll<Field>("field").then(
      (res: IRestResponse<Field[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllFields response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getField(id: number | undefined, callback: (err: any, result: Field | null) => void): void {
    this.rest.get<Field>("field/" + id).then(
      (res: IRestResponse<Field>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getField response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}