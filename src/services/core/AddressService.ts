import { IRestResponse } from "typed-rest-client/RestClient";
import { Address } from "../../models/core/Address";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class AddressService extends BaseService {
  static getAddress(id: number, callback: (err: any, result: Address | null) => void): void {
    this.rest.get<Address>("core/address/" + id).then(
      (res: IRestResponse<Address>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAddress response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAddressId(address: Address, callback: (err: any, result: Address | null) => void): void {
    this.rest.get<Address>("core/address").then(
      (res: IRestResponse<Address>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAddress response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllAddress(callback: (err: any, result: Address[] | null) => void): void {
    this.rest.getAll<Address>("core/address").then(
      (res: IRestResponse<Address[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllAddress response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}