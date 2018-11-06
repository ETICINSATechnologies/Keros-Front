import { IRestResponse } from "typed-rest-client/RestClient";
import { Firm } from "../../models/ua/Firm";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { FirmCreateRequest } from "../../models/ua/FirmCreateRequest";

export class FirmService extends BaseService {
  static getFirm(id: number, callback: (err: any, result: Firm | null) => void): void {
    this.rest.get<Firm>("ua/firm/" + id).then(
      (res: IRestResponse<Firm>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getFirm response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllFirms(callback: (err: any, result: Page<Firm> | null) => void): void {
    this.rest.get<Page<Firm>>("ua/firm").then(
      (res: IRestResponse<Page<Firm>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllFirms response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getListOfAllFirms(callback: (err: any, result: Firm[] | null) => void): void {
    this.rest.getAll<Firm>("ua/firm").then(
      (res: IRestResponse<Firm[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getListOfAllFirms response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createFirm(firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.create<FirmCreateRequest>("ua/firm", firmRequest).then(
      (res: IRestResponse<FirmCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("createFirm response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(id: number, firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.update<FirmCreateRequest>("ua/firm/" + id, firmRequest).then(
      (res: IRestResponse<FirmCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("update firm response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}
