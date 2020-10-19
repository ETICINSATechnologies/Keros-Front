import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Member, MemberRequest, SearchResponse } from "../models";

export class MemberService extends BaseService {
  static get(id: number): Promise<Member> {
    return this.api.keros.get<Member>(`core/member/${id}`).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object): Promise<SearchResponse<Member>> {
    return this.api.keros.get<SearchResponse<Member>>("core/member", { params }).then(
      (res: HttpResponse<SearchResponse<Member>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getCurrent(): Promise<Member> {
    return this.api.keros.get<Member>("core/member/me").then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static updateCurrent(req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>("core/member/me", req).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static update(id: number, req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>(`core/member/${id}`, req).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
