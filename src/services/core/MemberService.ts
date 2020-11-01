import { IRestResponse } from "typed-rest-client/RestClient";
import { Member } from "../../models/core/Member";
import { CreateCSVRequest } from "../../models/core/CreateCSVRequest";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { MemberCreateRequest } from "../../models/core/MemberCreateRequest";
import * as winston from "winston";
import { queryStringify } from "../../util/Helper";
import { DocumentResponse } from "../../models/DocumentResponse";

export class MemberService extends BaseService {
  static getMember(id: number, callback: (err: any, result: Member | null) => void): void {
    this.rest.get<Member>("core/member/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getConnectedMember(callback: (err: any, result: Member | null) => void): void {
    this.rest.get<Member>("core/member/me", this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllMembers(callback: (err: any, result: Page<Member> | null) => void, queryParams?: any): void {
    const queryString = queryStringify(queryParams);
    this.rest.get<Page<Member>>("core/member?" + queryString, this.defaultHeaders()).then(
      (res: IRestResponse<Page<Member>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
  static createMember(memberRequest: MemberCreateRequest, callback: (err: any, result: Member | null) => void): void {
    this.rest.create<Member>("core/member", memberRequest, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static update(memberId: number, memberRequest: MemberCreateRequest, callback: (err: any, result: Member | null) => void): void {
    this.rest.update<Member>("core/member/" + memberId, memberRequest, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

    static updateConnectedMember(memberRequest: MemberCreateRequest, callback: (err: any, result: Member | null) => void): void {
        this.rest.update<Member>("core/member/me", memberRequest, this.defaultHeaders()).then(
            (res: IRestResponse<Member>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError(res.statusCode), null);
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

  static delete(memberId: number, callback: (err: any) => void): void {
    this.rest.del<Member>("core/member/" + memberId, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 204) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static exportCSVMembers(createCSVRequest: CreateCSVRequest, callback: (err: any, result: DocumentResponse | null) => void): void {
    this.rest.create<DocumentResponse>("core/member/export", createCSVRequest, this.defaultHeaders()).then(
      (res: IRestResponse<DocumentResponse>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}
