import winston from "winston";

import { BaseService } from "../../common/services";

import { Position } from "../models";

export class PositionService extends BaseService {
  private static cacheValues: Position[];
  private static cacheExpires = 0;

  static async getAll(): Promise<Position[]> {
    if (Date.now() < PositionService.cacheExpires) {
      winston.debug("Loaded positions from cache");
      return new Promise<Position[]>((resolve, _reject) => resolve(PositionService.cacheValues));
    }

    return this.api.keros.get<Position[]>("core/position").then(
      (res: Position[]) => {
        PositionService.cacheValues = res;
        PositionService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res;
      }
    );
  }
}