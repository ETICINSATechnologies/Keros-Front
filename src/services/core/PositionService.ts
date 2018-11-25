import {IRestResponse} from "typed-rest-client/RestClient";
import {BaseService} from "../common/BaseService";
import * as winston from "winston";

export class PositionService extends BaseService {

  private static cachePositionsValues: Position[] | null = null;
  private static cachePositionsExpires: number = 0;

  static getAllPositions(callback: (err: any, result: Position[] | null) => void): void {
    if (Date.now() < this.cachePositionsExpires) {
      callback(null, this.cachePositionsValues);
    } else {
      this.rest.getAll<Position>("core/position", this.defaultHeaders()).then(
        (res: IRestResponse<Position[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cachePositionsValues = res.result;
          this.cachePositionsExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getPosition(id: number | undefined, callback: (err: any, result: Position | null) => void): void {
    this.rest.get<Position>("core/position/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Position>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}