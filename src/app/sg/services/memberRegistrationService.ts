import winston from "winston";
import FormData from "form-data";

import { BaseService } from "../../common/services";
import {
  HttpResponse,
  HttpError,
  SearchResponse,
  DocumentResponse
} from "../../common/models";

import { MemberRegistration, MemberRegistrationRequest } from "../models";

export class MemberRegistrationService extends BaseService {
  static get(id: number): Promise<MemberRegistration> {
    return this.api.keros.get<MemberRegistration>(`sg/membre-inscription/${id}`);
  }

  static getAll(params?: object): Promise<SearchResponse<MemberRegistration>> {
    return this.api.keros.get<SearchResponse<MemberRegistration>>("sg/membre-inscription", { params });
  }

  static create(id: number, req: MemberRegistrationRequest): Promise<MemberRegistration> {
    return this.api.keros.post<MemberRegistration>("sg/membre-inscription/", req);
  }

  static update(id: number, req: MemberRegistrationRequest): Promise<MemberRegistration> {
    return this.api.keros.put<MemberRegistration>(`sg/membre-inscription/${id}`, req);
  }

  static delete(id: number): Promise<boolean> {
    return this.api.keros.delete<boolean>(`sg/membre-inscription/${id}`);
  }

  static validate(id: number): Promise<void> {
    return this.api.keros.post<void>(`sg/membre-inscription/${id}/validate`, {});
  }

  static getTemplate(id: number, doc: number): Promise<DocumentResponse> {
    return this.api.keros.get<DocumentResponse>(`sg/membre-inscription/${id}/document/${doc}/generate`);
  }

  static getDocument(id: number, doc: number): Promise<DocumentResponse> {
    return this.api.keros.get<DocumentResponse>(`sg/membre-inscription/${id}/document/${doc}`);
  }

  static uploadDocument(id: number, doc: number, data: FormData) {
    return this.api.keros.post<void>(`sg/membre-inscription/${id}/document/${doc}`, data);
  }
}
