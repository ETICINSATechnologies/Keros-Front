import { IRestResponse } from "typed-rest-client/RestClient";
import { Address } from "../../models/core/Address";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";

export class AddressService extends BaseService {
    static getAddress(id: number, callback: (err: any, result: Address | null) => void): void {
        this.rest.get<Address>("address/" + id).then(
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
        this.rest.get<Address>("address").then(
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
        this.rest.getAll<Address>("address").then(
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