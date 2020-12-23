import { BaseService } from "../../common/services";
import { DocumentResponse, SearchResponse } from "../../common/models";

import { Member, MemberRequest } from "../models";

export class MemberService extends BaseService {
  static async get(id: number): Promise<Member> {
    return this.api.keros.get<Member>(`core/member/${id}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  static async getAll(params?: {[key: string]: any}): Promise<SearchResponse<Member>> {
    return this.api.keros.get<SearchResponse<Member>>("core/member", { params });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  static async getCurrent(): Promise<Member> {
    return this.api.keros.get<Member>("core/member/me");
  }

  static async update(id: number, req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>(`core/member/${id}`, req);
  }

  static async updateCurrent(req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>("core/member/me", req);
  }

  static async create(req: MemberRequest): Promise<Member> {
    return this.api.keros.post<Member>("core/member", req);
  }

  static async delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`core/member/${id}`);
  }

  static async exportCSV(idList: number[]): Promise<DocumentResponse> {
    return this.api.keros.post<DocumentResponse>("core/member/export", { idList });
  }
}
