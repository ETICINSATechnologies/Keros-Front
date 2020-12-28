import FormData from "form-data";

import { BaseService } from "../../common/services";
import { SearchResponse, DocumentResponse } from "../../common/models";

import { MemberRegistration, MemberRegistrationRequest } from "../models";

export class MemberRegistrationService extends BaseService {
  static get(id: number): Promise<MemberRegistration> {
    return this.api.keros.get<MemberRegistration>(`sg/membre-inscription/${id}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  static getAll(params?: {[key: string]: any}): Promise<SearchResponse<MemberRegistration>> {
    return this.api.keros.get<SearchResponse<MemberRegistration>>("sg/membre-inscription", { params });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  static create(req: MemberRegistrationRequest): Promise<MemberRegistration> {
    return this.api.keros.post<MemberRegistration>("sg/membre-inscription", req);
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

  static uploadDocument(id: number, doc: number, data: FormData): Promise<void> {
    return this.api.keros.post<void>(`sg/membre-inscription/${id}/document/${doc}`, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`
      }
    });
  }
}
