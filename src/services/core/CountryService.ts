import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import { Country } from "../../models/core/Country";
import * as winston from "winston";

export class CountryService extends BaseService {

  private static cacheCountriesValues: Country[] | null = null;
  private static cacheCountriesExpires = 0;

  static getAllCountries(callback: (err: any, result: Country[] | null) => void): void {
    if (Date.now() < this.cacheCountriesExpires) {
      callback(null, this.cacheCountriesValues);
    } else {
      this.rest.getAll<Country>("core/country", this.defaultHeaders()).then(
        (res: IRestResponse<Country[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheCountriesValues = res.result;
          this.cacheCountriesExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getCountry(id: number | undefined, callback: (err: any, result: Country | null) => void): void {
    this.rest.get<Country>("core/country/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Country>) => {
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