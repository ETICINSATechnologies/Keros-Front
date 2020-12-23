import { BaseService } from "../../common/services";
import { DocumentResponse, SearchResponse } from "../../common/models";

import { Consultant, ConsultantRequest } from "../models";

export class ConsultantService extends BaseService {
  static async get(id: number): Promise<Consultant> {
    return this.api.keros.get<Consultant>(`core/consultant/${id}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  static async getAll(params?: {[key: string]: any}): Promise<SearchResponse<Consultant>> {
    return this.api.keros.get<SearchResponse<Consultant>>("core/consultant", { params });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  static async getCurrent(): Promise<Consultant> {
    return this.api.keros.get<Consultant>("core/consultant/me");
  }

  static async getProtected(id: number): Promise<Consultant> {
    return this.api.keros.get<Consultant>(`core/consultant/${id}/protected`);
  }

  static async update(id: number, req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>(`core/consultant/${id}`, req);
  }

  static async updateCurrent(req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>("core/consultant/me", req);
  }

  static async create(req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.post<Consultant>("core/consultant", req);
  }

  static async delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`core/consultant/${id}`);
  }

  static async exportCSV(idList: number[]): Promise<DocumentResponse> {
    return this.api.keros.post<DocumentResponse>("core/consultant/export", { idList });
  }
}
