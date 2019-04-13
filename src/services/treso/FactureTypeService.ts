import { BaseService } from "../common/BaseService";
import { IRestResponse } from "typed-rest-client/RestClient";
import * as winston from "winston";

export class FactureTypeService extends BaseService {
  static getAllFactureTypes(callback: (err: any, result: string[] | null) => void): void {
    this.rest.getAll<string>("treso/facture-types", this.defaultHeaders()).then(
      (res: IRestResponse<string[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.info("Getting Facture Types");
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}
