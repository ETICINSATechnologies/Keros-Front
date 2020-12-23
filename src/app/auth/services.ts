import { BaseService } from "../common/services";

import { LoginRequest, LoginResponse } from "./models";

export class AuthService extends BaseService {
  static async login(req: LoginRequest): Promise<LoginResponse> {
    return this.api.keros.post<LoginResponse>("auth/login", req).then(
      (res: LoginResponse) => {
        this.api.keros.setDefaultHeader("Authorization", res.token);
        return res;
      }
    );
  }
}
