import { IRestResponse } from "typed-rest-client/RestClient";
import { Member } from "../../models/core/Member";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { MemberCreateRequest } from "../../models/core/MemberCreateRequest";

export class MemberService extends BaseService {
  static getMember(id: number, callback: (err: any, result: Member | null) => void): void {
    this.rest.get<Member>("core/member/" + id).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getMember response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllMembers(callback: (err: any, result: Page<Member> | null) => void): void {
    this.rest.get<Page<Member>>("core/member").then(
      (res: IRestResponse<Page<Member>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllMembers response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createMember(memberRequest: MemberCreateRequest, callback: (err: any) => void): void {
    this.rest.create<MemberCreateRequest>("core/member", memberRequest).then(
      (res: IRestResponse<MemberCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("createMember response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(memberRequest: MemberCreateRequest, callback: (err: any) => void): void {
    this.rest.create<MemberCreateRequest>("core/member", memberRequest).then(
      (res: IRestResponse<MemberCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("update member with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}