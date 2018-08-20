import { BaseService } from "../common/BaseService";
import { IRestResponse } from "typed-rest-client/RestClient";
import * as winston from "winston";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";


export class AuthService extends BaseService {

  /**
   * Login and acquire auth token if successful
   */
  static login(request: LoginRequest, callback: (err: any, response: LoginResponse | null) => void): void {
    this.rest.create<LoginResponse>("auth/login", request).then(
      (res: IRestResponse<LoginResponse>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Login response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => {
        callback(e, null)
      }
    );
  }
}