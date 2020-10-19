import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Gender } from "../models";

export class GenderService extends BaseService {
  private static cacheValues: Gender[];
  private static cacheExpires = 0;

  static getAll(): Promise<Gender[]> {
    if (Date.now() < GenderService.cacheExpires) {
      winston.debug("Loaded genders from cache");
      return new Promise<Gender[]>((resolve, reject) => resolve(GenderService.cacheValues));
    }

    return this.api.keros.get<Gender[]>("core/gender").then(
      (res: HttpResponse<Gender[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        GenderService.cacheValues = res.data;
        GenderService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}
