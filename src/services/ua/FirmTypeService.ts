import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Country } from "../../models/core/Country";
import { FirmType } from "../../models/ua/FirmType";

export class FirmTypeService extends BaseService {
  static getAllFirmTypes(callback: (err: any, result: FirmType[] | null) => void): void {
    this.rest.getAll<FirmType>("firmType").then(
      (res: IRestResponse<FirmType[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllFirmTypes response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getFirmType(id: number | undefined, callback: (err: any, result: FirmType | null) => void): void {
    this.rest.get<FirmType>("firmType/" + id).then(
      (res: IRestResponse<FirmType>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getFirmType response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}
