import winston from "winston";

import { BaseService } from "../../common/services";
import {
  HttpResponse,
  HttpError,
  DocumentResponse,
  SearchResponse
} from "../../common/models";

import { Consultant, ConsultantRequest } from "../models";

export class ConsultantService extends BaseService {
  static get(id: number): Promise<Consultant> {
    return this.api.keros.get<Consultant>(`core/consultant/${id}`);
  }

  static getAll(params?: object): Promise<SearchResponse<Consultant>> {
    return this.api.keros.get<SearchResponse<Consultant>>("core/consultant", { params });
  }

  static getCurrent(): Promise<Consultant> {
    return this.api.keros.get<Consultant>("core/consultant/me");
  }

  static getProtected(id: number): Promise<Consultant> {
    return this.api.keros.get<Consultant>(`core/consultant/${id}/protected`);
  }

  static update(id: number, req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>(`core/consultant/${id}`, req);
  }

  static updateCurrent(req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>("core/consultant/me", req);
  }

  static create(req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.post<Consultant>("core/consultant", req);
  }

  static delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`core/consultant/${id}`);
  }

  static exportCSV(idList: number[]): Promise<DocumentResponse> {
    return this.api.keros.post<DocumentResponse>("core/consultant/export", { idList });
  }
}
