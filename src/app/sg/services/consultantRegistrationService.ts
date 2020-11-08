import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError, SearchResponse } from "../../common/models";

import { ConsultantRegistration, ConsultantRegistrationRequest } from "../models";

export class ConsultantRegistrationService extends BaseService {
  static get(id: number): Promise<ConsultantRegistration> {
    return this.api.keros.get<ConsultantRegistration>(`sg/consultant-inscription/${id}`);
  }

  static getAll(params?: object): Promise<SearchResponse<ConsultantRegistration>> {
    return this.api.keros.get<SearchResponse<ConsultantRegistration>>("sg/consultant-inscription", { params });
  }

  static getProtected(id: number): Promise<ConsultantRegistration> {
    return this.api.keros.get<ConsultantRegistration>(`sg/consultant-inscription/${id}/protected`);
  }

  static create(id: number, req: ConsultantRegistrationRequest): Promise<ConsultantRegistration> {
    return this.api.keros.post<ConsultantRegistration>("sg/consultant-inscription/", req);
  }

  static update(id: number, req: ConsultantRegistrationRequest): Promise<ConsultantRegistration> {
    return this.api.keros.put<ConsultantRegistration>(`sg/consultant-inscription/${id}`, req);
  }

  static delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`sg/consultant-inscription/${id}`);
  }

  static validate(id: number): Promise<void> {
    return this.api.keros.post<void>(`sg/consultant-inscription/${id}/validate`, {});
  }
}
