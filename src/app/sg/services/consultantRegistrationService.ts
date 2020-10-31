import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError, SearchResponse } from "../../common/models";

import { ConsultantRegistration } from "../models";

export class ConsultantRegistrationService extends BaseService {
  static get(id: string): Promise<ConsultantRegistration> {
    return this.api.keros.get<ConsultantRegistration>(`sg/consultant-inscription/${id}`).then(
      (res: HttpResponse<ConsultantRegistration>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object): Promise<SearchResponse<ConsultantRegistration>> {
    return this.api.keros.get<SearchResponse<ConsultantRegistration>>("sg/consultant-inscription", { params }).then(
      (res: HttpResponse<SearchResponse<ConsultantRegistration>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
