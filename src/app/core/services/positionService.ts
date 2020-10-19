import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Position } from "../models";

export class PositionService extends BaseService {
  private static cacheValues: Position[];
  private static cacheExpires = 0;

  static getAll(): Promise<Position[]> {
    if (Date.now() < PositionService.cacheExpires) {
      winston.debug("Loaded positions from cache");
      return new Promise<Position[]>((resolve, reject) => resolve(PositionService.cacheValues));
    }

    return this.api.keros.get<Position[]>("core/position").then(
      (res: HttpResponse<Position[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        PositionService.cacheValues = res.data;
        PositionService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}
