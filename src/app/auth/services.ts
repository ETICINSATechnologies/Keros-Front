import winston from "winston";

import { BaseService } from "../common/services";
import { HttpResponse, HttpError } from "../common/models";

import { LoginRequest, LoginResponse } from "./models";

export class AuthService extends BaseService {
  static login(req: LoginRequest): Promise<LoginResponse> {
    return this.api.keros.post<LoginResponse>("auth/login", req).then(
      (res: HttpResponse<LoginResponse>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        this.api.keros.setDefaultHeader("Authorization", res.data.token);
        return res.data;
      }
    );
  }
}
