import {IRestResponse} from "typed-rest-client/RestClient";
import {Firm} from "../../models/ua/Firm";
import {BaseService} from "../common/BaseService";
import {Page} from "../../models/core/Page";
import {FirmCreateRequest} from "../../models/ua/FirmCreateRequest";
import * as winston from "winston";

export class FirmService extends BaseService {
  static getFirm(id: number, callback: (err: any, result: Firm | null) => void): void {
    this.rest.get<Firm>("ua/firm/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Firm>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllFirms(callback: (err: any, result: Page<Firm> | null) => void): void {
    this.rest.get<Page<Firm>>("ua/firm", this.defaultHeaders()).then(
      (res: IRestResponse<Page<Firm>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createFirm(firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.create<FirmCreateRequest>("ua/firm", firmRequest, this.defaultHeaders()).then(
      (res: IRestResponse<FirmCreateRequest>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError());
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(id: number, firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.update<FirmCreateRequest>("ua/firm/" + id, firmRequest, this.defaultHeaders()).then(
      (res: IRestResponse<FirmCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static delete(id: number, callback: (err: any) => void): void {
    this.rest.del<Firm>("ua/firm/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Firm>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}
