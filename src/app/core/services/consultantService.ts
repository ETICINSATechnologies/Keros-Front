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
    return this.api.keros.get<Consultant>(`core/consultant/${id}`).then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object): Promise<SearchResponse<Consultant>> {
    return this.api.keros.get<SearchResponse<Consultant>>("core/consultant", { params }).then(
      (res: HttpResponse<SearchResponse<Consultant>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getCurrent(): Promise<Consultant> {
    return this.api.keros.get<Consultant>("core/consultant/me").then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static update(id: number, req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>(`core/consultant/${id}`, req).then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static updateCurrent(req: ConsultantRequest): Promise<Consultant> {
    return this.api.keros.put<Consultant>("core/consultant/me", req).then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static exportCSV(idList: number[]): Promise<DocumentResponse> {
    return this.api.keros.post<DocumentResponse>("core/consultant/export", { idList }).then(
      (res: HttpResponse<DocumentResponse>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
