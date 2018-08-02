import { IRestResponse } from "typed-rest-client/RestClient";
import { Firm } from "../../models/ua/Firm";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";

export class FirmService extends BaseService {
    static getFirm(id: number, callback: (err: any, result: Firm | null) => void): void {
        this.rest.get<Firm>("firm/" + id).then(
            (res: IRestResponse<Firm>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError(), null);
                }
                winston.debug("getFirm response with status " + res.statusCode);
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

    static getAllFirms(callback: (err: any, result: Page<Firm> | null) => void): void {
        this.rest.get<Page<Firm>>("firm").then(
            (res: IRestResponse<Page<Firm>>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError(), null);
                }
                winston.debug("getAllFirms response with status " + res.statusCode);
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

    static createFirm(member: Firm, callback: (err: any) => void): void {
        this.rest.create<Firm>("firm", Firm).then(
            (res: IRestResponse<Firm>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError());
                }
                winston.debug("createFirm response with status " + res.statusCode);
                callback(null);
            }
        ).catch(
            e => callback(e)
        );
    }

    static del(member: Firm, callback: (err: any) => void): void {
        this.rest.create<Firm>("firm", Firm).then(
            (res: IRestResponse<Firm>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError());
                }
                winston.debug("del response with status " + res.statusCode);
                callback(null);
            }
        ).catch(
            e => callback(e)
        );
    }

    static update(member: Firm, callback: (err: any) => void): void {
        this.rest.create<Firm>("firm", Firm).then(
            (res: IRestResponse<Firm>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError());
                }
                winston.debug("update response with status " + res.statusCode);
                callback(null);
            }
        ).catch(
            e => callback(e)
        );
    }
}