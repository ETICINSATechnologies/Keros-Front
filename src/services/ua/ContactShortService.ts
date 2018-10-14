import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { ContactShort } from "../../models/ua/ContactShort";

export class ContactShortService extends BaseService {
  static getContactShort(id: number, callback: (err: any, result: ContactShort | null) => void): void {
    this.rest.get<ContactShort>("ua/contactShort/" + id).then(
      (res: IRestResponse<ContactShort>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getContactShort response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllContactShorts(callback: (err: any, result: ContactShort[] | null) => void): void {
    this.rest.getAll<ContactShort>("contactShort").then(
      (res: IRestResponse<ContactShort[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllContactShorts response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

}
