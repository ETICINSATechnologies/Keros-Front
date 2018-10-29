import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class PositionService extends BaseService {
  static getAllPositions(callback: (err: any, result: Position[] | null) => void): void {
    this.rest.getAll<Position>("position").then(
      (res: IRestResponse<Position[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllPositions response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getPosition(id: number | undefined, callback: (err: any, result: Position | null) => void): void {
    this.rest.get<Position>("position/" + id).then(
      (res: IRestResponse<Position>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getPosition response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}