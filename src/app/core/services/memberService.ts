import winston from "winston";

import { BaseService } from "../../common/services";
import {
  HttpResponse,
  HttpError,
  DocumentResponse,
  SearchResponse
} from "../../common/models";

import { Member, MemberRequest } from "../models";

export class MemberService extends BaseService {
  static get(id: number): Promise<Member> {
    return this.api.keros.get<Member>(`core/member/${id}`);
  }

  static getAll(params?: object): Promise<SearchResponse<Member>> {
    return this.api.keros.get<SearchResponse<Member>>("core/member", { params });
  }

  static getCurrent(): Promise<Member> {
    return this.api.keros.get<Member>("core/member/me");
  }

  static update(id: number, req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>(`core/member/${id}`, req);
  }

  static updateCurrent(req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>("core/member/me", req);
  }

  static create(req: MemberRequest): Promise<Member> {
    return this.api.keros.post<Member>("core/member", req);
  }

  static delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`core/member/${id}`);
  }

  static exportCSV(idList: number[]): Promise<DocumentResponse> {
    return this.api.keros.post<DocumentResponse>("core/member/export", { idList });
  }
}
