import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import * as winston from "winston";
import { BulletinVersement } from "../../models/treso/BulletinVersement";
import { BulletinVersementCreateRequest } from "../../models/treso/BulletinVersementCreateRequest";

export class BulletinVersementService extends BaseService {

  static getBulletinVersement(id: number, callback: (err: any, result: BulletinVersement | null) => void): void {
    this.rest.get<BulletinVersement>("treso/payment-slip/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersement>) => {
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

  static getAllBulletinsVersement(callback: (err: any, result: Page<BulletinVersement> | null) => void): void {
    this.rest.get<Page<BulletinVersement>>("treso/payment-slip", this.defaultHeaders()).then(
      (res: IRestResponse<Page<BulletinVersement>>) => {
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

  static createBulletinVersement(bulletinVersementRequest: BulletinVersementCreateRequest, callback: (err: any) => void): void {
    this.rest.create<BulletinVersementCreateRequest>("treso/payment-slip", bulletinVersementRequest, this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersementCreateRequest>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(id: number, bulletinVersementRequest: BulletinVersementCreateRequest, callback: (err: any) => void): void {
    this.rest.update<BulletinVersement>("treso/payment-slip/" + id, bulletinVersementRequest, this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersement>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static delete(id: number, callback: (err: any) => void): void {
    this.rest.del<BulletinVersement>("treso/payment-slip/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersement>) => {
        if (res.statusCode !== 204) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static validateUa(id: number, callback: (err: any) => void): void {
    this.rest.create<BulletinVersement>("treso/payment-slip/" + id + "/validate-ua", this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersement>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors de la validation");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Le bulletin " + id + " a été validé par l'UA");
        callback(null);
      }
    ).catch(
      e => {
        callback(e);
      }
    );
  }

  static validatePerf(id: number, callback: (err: any) => void): void {
    this.rest.create<BulletinVersement>("treso/payment-slip/" + id + "/validate-perf", this.defaultHeaders()).then(
      (res: IRestResponse<BulletinVersement>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors de la validation");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Le bulletin " + id + " a été validé par la Perfo");
        callback(null);
      }
    ).catch(
      e => {
        callback(e);
      }
    );
  }

}
