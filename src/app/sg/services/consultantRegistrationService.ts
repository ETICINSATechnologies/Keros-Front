import { BaseService } from "../../common/services";
import { SearchResponse, DocumentResponse } from "../../common/models";

import { ConsultantRegistration, ConsultantRegistrationRequest } from "../models";

export class ConsultantRegistrationService extends BaseService {
  static get(id: number): Promise<ConsultantRegistration> {
    return this.api.keros.get<ConsultantRegistration>(`sg/consultant-inscription/${id}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  static getAll(params?: {[key: string]: any}): Promise<SearchResponse<ConsultantRegistration>> {
    return this.api.keros.get<SearchResponse<ConsultantRegistration>>("sg/consultant-inscription", { params });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  static getProtected(id: number): Promise<ConsultantRegistration> {
    return this.api.keros.get<ConsultantRegistration>(`sg/consultant-inscription/${id}/protected`);
  }

  static create(req: ConsultantRegistrationRequest): Promise<ConsultantRegistration> {
    return this.api.keros.post<ConsultantRegistration>("sg/consultant-inscription", req);
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

  static getTemplate(id: number, doc: string): Promise<DocumentResponse> {
    return this.api.keros.get<DocumentResponse>(`sg/consultant-inscription/${id}/document/${doc}/generate`);
  }

  static getDocument(id: number, doc: string): Promise<DocumentResponse> {
    return this.api.keros.get<DocumentResponse>(`sg/consultant-inscription/${id}/document/${doc}`);
  }
}
