import {IRestResponse} from "typed-rest-client/RestClient";
import {BaseService} from "../common/BaseService";
import {FirmType} from "../../models/ua/FirmType";
import * as winston from "winston";

export class FirmTypeService extends BaseService {

  private static cacheFirmTypesValues: FirmType[] | null = null;
  private static cacheFirmTypesExpires: number = 0;

  static getAllFirmTypes(callback: (err: any, result: FirmType[] | null) => void): void {
    if (Date.now() < this.cacheFirmTypesExpires) {
      callback(null, this.cacheFirmTypesValues);
    } else {
      this.rest.getAll<FirmType>("ua/firm-type", this.defaultHeaders()).then(
        (res: IRestResponse<FirmType[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheFirmTypesValues = res.result;
          this.cacheFirmTypesExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getFirmType(id: number | undefined, callback: (err: any, result: FirmType | null) => void): void {
    this.rest.get<FirmType>("ua/firm-type/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<FirmType>) => {
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
