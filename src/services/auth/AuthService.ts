import { BaseService } from "../common/BaseService";
import { IRestResponse } from "typed-rest-client/RestClient";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import * as winston from "winston";


export class AuthService extends BaseService {

  /**
   * Login and acquire auth token if successful
   */
  static login(request: LoginRequest, callback: (err: any, response: LoginResponse | null) => void): void {
    this.rest.create<LoginResponse>("auth/login", request).then(
      (res: IRestResponse<LoginResponse>) => {
        if (res.statusCode !== 200) {
          if (res.statusCode === 401) {
            return callback(null, null);
          }
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => {
        callback(e, null)
      }
    );
  }
}