import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import { Field } from "../../models/ua/Field";
import * as winston from "winston";

export class FieldService extends BaseService {

  private static cacheFieldsValues: Field[] | null = null;
  private static cacheFieldsExpires = 0;

  static getAllFields(callback: (err: any, result: Field[] | null) => void): void {
    if (Date.now() < this.cacheFieldsExpires) {
      callback(null, this.cacheFieldsValues);
    } else {
      this.rest.getAll<Field>("ua/field", this.defaultHeaders()).then(
        (res: IRestResponse<Field[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheFieldsValues = res.result;
          this.cacheFieldsExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getField(id: number | undefined, callback: (err: any, result: Field | null) => void): void {
    this.rest.get<Field>("ua/field/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Field>) => {
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
