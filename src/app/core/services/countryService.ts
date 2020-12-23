import winston from "winston";

import { BaseService } from "../../common/services";

import { Country } from "../models";

export class CountryService extends BaseService {
  private static cacheValues: Country[];
  private static cacheExpires = 0;

  static async getAll(): Promise<Country[]> {
    if (Date.now() < CountryService.cacheExpires) {
      winston.debug("Loaded countries from cache");
      return new Promise<Country[]>((resolve, _reject) => resolve(CountryService.cacheValues));
    }

    return this.api.keros.get<Country[]>("core/country").then(
      (res: Country[]) => {
        CountryService.cacheValues = res;
        CountryService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res;
      }
    );
  }
}
