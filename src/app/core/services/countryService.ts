import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Country } from "../models";

export class CountryService extends BaseService {
  private static cacheValues: Country[];
  private static cacheExpires = 0;

  static getAll(): Promise<Country[]> {
    if (Date.now() < CountryService.cacheExpires) {
      winston.debug("Loaded countries from cache");
      return new Promise<Country[]>((resolve, reject) => resolve(CountryService.cacheValues));
    }

    return this.api.keros.get<Country[]>("core/country").then(
      (res: HttpResponse<Country[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        CountryService.cacheValues = res.data;
        CountryService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}
