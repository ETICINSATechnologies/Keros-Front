import { IRestResponse } from "typed-rest-client/RestClient";
import { Address } from "../../models/core/Address";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class AddressService extends BaseService {
  static getAddress(id: number | undefined, callback: (err: any, result: Address | null) => void): void {
    this.rest.get<Address>("core/address/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Address>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}