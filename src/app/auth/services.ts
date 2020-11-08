import winston from "winston";

import { BaseService } from "../common/services";
import { HttpResponse, HttpError } from "../common/models";

import { LoginRequest, LoginResponse } from "./models";

export class AuthService extends BaseService {
  static login(req: LoginRequest): Promise<LoginResponse> {
    return this.api.keros.post<LoginResponse>("auth/login", req).then(
      (res: LoginResponse) => {
        this.api.keros.setDefaultHeader("Authorization", res.token);
        return res;
      }
    );
  }
}
