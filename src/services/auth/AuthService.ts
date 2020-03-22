import { BaseService } from "../common/BaseService";
import { IRestResponse } from "typed-rest-client/RestClient";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { ForgetPasswordRequest } from "../../models/auth/ForgetPasswordRequest";
import * as winston from "winston";
import { ForgetPasswordResponse } from "../../models/auth/ForgetPasswordResponse";
import { ResetPasswordRequest } from "../../models/auth/ResetPasswordRequest";
import { ResetPasswordResponse } from "../../models/auth/ResetPasswordResponse";

export class AuthService extends BaseService {

  /**
   * Login and acquire auth token if successful
   */
  static login(request: LoginRequest, callback: (err: any, response: LoginResponse | null) => void): void {
    this.rest.create<LoginResponse>("auth/login", request).then(
      (res: IRestResponse<LoginResponse>) => {
        if (res.statusCode !== 200) {
          if (res.statusCode === 401) {
            return callback(res.statusCode, null);
          }
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => {
        callback(e, null);
      }
    );
  }

    /**
     * Send forget password request to server
     */
    static forgetPassword(request: ForgetPasswordRequest, callback: (err: any, response: ForgetPasswordResponse | null) => void): void {
        this.rest.create<ForgetPasswordResponse>("forgot-password-member", request).then(
            (res: IRestResponse<ForgetPasswordResponse>) => {
                if (res.statusCode !== 200) {
                    if (res.statusCode === 401) {
                        return callback(res.statusCode, null);
                    } else if (res.statusCode === 403) {
                        return callback(res.statusCode, null);
                    }
                    return callback(this.defaultError(res.statusCode), null);
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null, res.result);
            }
        ).catch(
            e => {
                callback(e, null);
            }
        );
    }

    /**
     * Send reset password request to server
     */
    static resetPassword(request: ResetPasswordRequest, callback: (err: any, response: ResetPasswordResponse | null) => void): void {
        this.rest.create<ResetPasswordResponse>("reset-password-member", request).then(
            (res: IRestResponse<ResetPasswordResponse>) => {
                if (res.statusCode !== 200) {
                    if (res.statusCode === 401) {
                        return callback(res.statusCode, null);
                    } else if (res.statusCode === 403) {
                        return callback(res.statusCode, null);
                    }
                    return callback(this.defaultError(res.statusCode), null);
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null, res.result);
            }
        ).catch(
            e => {
                callback(e, null);
            }
        );
    }
}
