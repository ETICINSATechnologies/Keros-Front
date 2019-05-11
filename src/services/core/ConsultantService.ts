import { IRestResponse } from "typed-rest-client/RestClient";
import { Consultant } from "../../models/core/Consultant";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { ConsultantCreateRequest } from "../../models/core/ConsultantCreateRequest";
import * as winston from "winston";
import { queryStringify } from "../../util/Helper";

export class ConsultantService extends BaseService {
    static getConsultant(id: number, callback: (err: any, result: Consultant | null) => void): void {
        this.rest.get<Consultant>("core/consultant/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<Consultant>) => {
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

    static getConnectedConsultant(callback: (err: any, result: Consultant | null) => void): void {
        this.rest.get<Consultant>("core/consultant/me", this.defaultHeaders()).then(
            (res: IRestResponse<Consultant>) => {
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

    static getAllConsultants(callback: (err: any, result: Page<Consultant> | null) => void, queryParams?: any): void {
        const queryString = queryStringify(queryParams);
        this.rest.get<Page<Consultant>>("core/consultant?" + queryString, this.defaultHeaders()).then(
            (res: IRestResponse<Page<Consultant>>) => {
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

    static createConsultant(consultantRequest: ConsultantCreateRequest, callback: (err: any, result: Consultant | null) => void): void {
        this.rest.create<Consultant>("core/consultant", consultantRequest, this.defaultHeaders()).then(
            (res: IRestResponse<Consultant>) => {
                if (res.statusCode !== 201) {
                    return callback(this.defaultError(res.statusCode), null);
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null, res.result);
            }
        ).catch(
            e => callback(e, null)
        );
    }

    // TODO why doesn't this return consultant ?
    static update(consultantId: number, consultantRequest: ConsultantCreateRequest, callback: (err: any, result: Consultant | null) => void): void {
        this.rest.update<Consultant>("core/consultant/" + consultantId, consultantRequest, this.defaultHeaders()).then(
            (res: IRestResponse<Consultant>) => {
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

    static delete(consultantId: number, callback: (err: any) => void): void {
        this.rest.del<Consultant>("core/consultant/" + consultantId, this.defaultHeaders()).then(
            (res: IRestResponse<Consultant>) => {
                if (res.statusCode !== 204) {
                    return callback(this.defaultError(res.statusCode));
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null);
            }
        ).catch(
            e => callback(e)
        );
    }
}
