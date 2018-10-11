import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Country } from "../../models/core/Country";

export class CountryService extends BaseService {
  static getAllCountries(callback: (err: any, result: Country[] | null) => void): void {
    this.rest.getAll<Country>("country").then(
      (res: IRestResponse<Country[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllCountries response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getCountry(id: number | undefined, callback: (err: any, result: Country | null) => void): void {
    this.rest.get<Country>("country/" + id).then(
      (res: IRestResponse<Country>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getCountry response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}