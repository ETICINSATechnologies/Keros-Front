import {IRestResponse} from "typed-rest-client/RestClient";
import {Firm} from "../../models/ua/Firm";
import {BaseService} from "../common/BaseService";
import {Page} from "../../models/core/Page";
import {FirmCreateRequest} from "../../models/ua/FirmCreateRequest";
import * as winston from "winston";
import { Member } from "../../models/core/Member";

export class FirmService extends BaseService {
  static getFirm(id: number, callback: (err: any, result: Firm | null) => void): void {
    this.rest.get<Firm>("ua/firm/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Firm>) => {
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

  static getAllFirms(callback: (err: any, result: Page<Firm> | null) => void, queryParams?: any): void {
    let queryString = "";
    if (queryParams && Object.keys(queryParams).length !== 0) {
      let paramTuples: any[] = [];
      for (const key in queryParams) {
        const value = queryParams[key];
        paramTuples.push([key, value].join("="));
      }
      queryString = "?" + paramTuples.join("&");
    }
    this.rest.get<Page<Firm>>("ua/firm" + queryString, this.defaultHeaders()).then(
      (res: IRestResponse<Page<Firm>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        let totalPages = 1;
        if (res.result && res.result.meta && res.result.meta.totalPages) {
          totalPages = res.result.meta.totalPages;
        }
        if (totalPages !== 1) {
          let pageCount = 1;
          while (totalPages - pageCount !== 0) {
            this.rest.get<Page<Firm>>("ua/firm?pageNumber=" + pageCount + queryString, this.defaultHeaders()).then(
              (resu: IRestResponse<Page<Firm>>) => {
                if (resu.statusCode !== 200) {
                  return callback(this.defaultError(resu.statusCode), null);
                }
                winston.debug('Response for page ' + pageCount + ' : ' + JSON.stringify(resu));
                if (res.result && res.result.content && resu.result && resu.result.content) {
                  res.result.content = res.result.content.concat(resu.result.content);
                  callback(null, res.result);
                }
              }).catch(e => callback(e, null)
            );
            pageCount += 1;
          }
        } else {
          callback(null, res.result);
        }
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createFirm(firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.create<FirmCreateRequest>("ua/firm", firmRequest, this.defaultHeaders()).then(
      (res: IRestResponse<FirmCreateRequest>) => {
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

  static update(id: number, firmRequest: FirmCreateRequest, callback: (err: any) => void): void {
    this.rest.update<FirmCreateRequest>("ua/firm/" + id, firmRequest, this.defaultHeaders()).then(
      (res: IRestResponse<FirmCreateRequest>) => {
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
    this.rest.del<Firm>("ua/firm/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Firm>) => {
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
}
