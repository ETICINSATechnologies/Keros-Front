import { IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../models/ua/Study";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";

export class StudyService extends BaseService {
    static getStudy(id: number, callback: (err: any, result: Study | null) => void): void {
        this.rest.get<Study>("study/" + id).then(
            (res: IRestResponse<Study>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError(), null);
                }
                winston.debug("getStudy response with status " + res.statusCode);
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

    static getAllStudies(callback: (err: any, result: Page<Study> | null) => void): void {
        this.rest.get<Page<Study>>("study").then(
            (res: IRestResponse<Page<Study>>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError(), null);
                }
                winston.debug("getAllStudies response with status " + res.statusCode);
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

    static createStudy(member: Study, callback: (err: any) => void): void {
        this.rest.create<Study>("study", Study).then(
            (res: IRestResponse<Study>) => {
                if (res.statusCode !== 200) {
                    return callback(this.defaultError());
                }
                winston.debug("createStudy response with status " + res.statusCode);
                callback(null);
            }
        ).catch(
            e => callback(e)
        );
    }

    static del(member: Study, callback: (err: any) => void): void {
        this.rest.create<Study>("study", Study).then(
            (res: IRestResponse<Study>) => {
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

    static update(member: Study, callback: (err: any) => void): void {
        this.rest.create<Study>("study", Study).then(
            (res: IRestResponse<Study>) => {
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