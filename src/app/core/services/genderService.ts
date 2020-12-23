import winston from "winston";

import { BaseService } from "../../common/services";

import { Gender } from "../models";

export class GenderService extends BaseService {
  private static cacheValues: Gender[];
  private static cacheExpires = 0;

  static async getAll(): Promise<Gender[]> {
    if (Date.now() < GenderService.cacheExpires) {
      winston.debug("Loaded genders from cache");
      return new Promise<Gender[]>((resolve, _reject) => resolve(GenderService.cacheValues));
    }

    return this.api.keros.get<Gender[]>("core/gender").then(
      (res: Gender[]) => {
        GenderService.cacheValues = res;
        GenderService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res;
      }
    );
  }
}
