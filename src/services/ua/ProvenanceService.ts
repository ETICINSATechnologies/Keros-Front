import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Provenance } from "../../models/ua/Provenance";

export class ProvenanceService extends BaseService {
  static getAllProvenances(callback: (err: any, result: Provenance[] | null) => void): void {
    this.rest.getAll<Provenance>("ua/provenance").then(
      (res: IRestResponse<Provenance[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllProvenances response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getProvenance(id: number | undefined, callback: (err: any, result: Provenance | null) => void): void {
    this.rest.get<Provenance>("ua/provenance/" + id).then(
      (res: IRestResponse<Provenance>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getProvenance response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}