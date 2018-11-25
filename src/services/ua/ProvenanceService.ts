import {IRestResponse} from "typed-rest-client/RestClient";
import {BaseService} from "../common/BaseService";
import {Provenance} from "../../models/ua/Provenance";
import * as winston from "winston";

export class ProvenanceService extends BaseService {

  private static cacheProvenancesValues: Provenance[] | null = null;
  private static cacheProvenancesExpires: number = 0;

  static getAllProvenances(callback: (err: any, result: Provenance[] | null) => void): void {
    if (Date.now() < this.cacheProvenancesExpires) {
      callback(null, this.cacheProvenancesValues);
    } else {
      this.rest.getAll<Provenance>("ua/provenance", this.defaultHeaders()).then(
        (res: IRestResponse<Provenance[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheProvenancesValues = res.result;
          this.cacheProvenancesExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getProvenance(id: number | undefined, callback: (err: any, result: Provenance | null) => void): void {
    this.rest.get<Provenance>("ua/provenance/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Provenance>) => {
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
}