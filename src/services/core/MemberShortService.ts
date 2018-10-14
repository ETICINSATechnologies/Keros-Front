import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { MemberShort } from "../../models/core/MemberShort";

export class MemberShortService extends BaseService {
  static getMemberShort(id: number, callback: (err: any, result: MemberShort | null) => void): void {
    this.rest.get<MemberShort>("memberShort/" + id).then(
      (res: IRestResponse<MemberShort>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getMemberShort response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllMemberShorts(callback: (err: any, result: MemberShort[] | null) => void): void {
    this.rest.getAll<MemberShort>("memberShort").then(
      (res: IRestResponse<MemberShort[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllMemberShorts response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getListOfAllMemberShorts(callback: (err: any, result: MemberShort[] | null) => void): void {
    this.rest.getAll<MemberShort>("memberShort").then(
      (res: IRestResponse<MemberShort[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getListOfAllMemberShorts response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}