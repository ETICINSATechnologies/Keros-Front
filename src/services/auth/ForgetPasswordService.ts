import { BaseService } from "../common/BaseService";
import { IRestResponse } from "typed-rest-client/RestClient";
import { ForgetPasswordRequest } from "../../models/auth/ForgetPasswordRequest";
import { ForgetPasswordResponse } from "../../models/auth/ForgetPasswordResponse";
import { LoginRequest } from "../../models/auth/LoginRequest";
import * as winston from "winston";


export class ForgetPasswordService extends BaseService {

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
}
