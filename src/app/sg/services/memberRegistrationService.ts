import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError, SearchResponse } from "../../common/models";

import { MemberRegistration } from "../models";

export class MemberRegistrationService extends BaseService {
  static get(id: string): Promise<MemberRegistration> {
    return this.api.keros.get<MemberRegistration>(`sg/membre-inscription/${id}`).then(
      (res: HttpResponse<MemberRegistration>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object): Promise<SearchResponse<MemberRegistration>> {
    return this.api.keros.get<SearchResponse<MemberRegistration>>("sg/membre-inscription", { params }).then(
      (res: HttpResponse<SearchResponse<MemberRegistration>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
