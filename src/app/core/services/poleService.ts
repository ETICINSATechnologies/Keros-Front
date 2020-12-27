import winston from "winston";

import { BaseService } from "../../common/services";

import { Pole } from "../models";

export class PoleService extends BaseService {
  private static cacheValues: Pole[];
  private static cacheExpires = 0;

  static async getAll(): Promise<Pole[]> {
    if (Date.now() < PoleService.cacheExpires) {
      winston.debug("Loaded poles from cache");
      return new Promise<Pole[]>((resolve, _reject) => resolve(PoleService.cacheValues));
    }

    return this.api.keros.get<Pole[]>("core/pole").then(
      (res: Pole[]) => {
        PoleService.cacheValues = res;
        PoleService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res;
      }
    );
  }
}