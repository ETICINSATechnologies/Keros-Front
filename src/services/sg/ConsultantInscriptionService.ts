import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { ConsultantInscription } from "../../models/sg/ConsultantInscription";
import { Page } from "../../models/core/Page";
import { ConsultantInscriptionCreateRequest } from "../../models/sg/ConsultantInscriptionCreateRequest";
import { DocumentResponse } from "../../models/DocumentResponse";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { MemberInscription } from "../../models/sg/MemberInscription";
import { queryStringify } from "../../util/Helper";

export class ConsultantInscriptionService extends BaseService {
    static getConsultantInscription(id: number, callback: (err: any, result: ConsultantInscription | null) => void): void {
        this.rest.get<ConsultantInscription>("sg/consultant-inscription/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<ConsultantInscription>) => {
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

    static getAllConsultantInscriptions(callback: (err: any, result: Page<ConsultantInscription> | null) => void, queryParams?: any): void {
        const queryString = queryStringify(queryParams);
        this.rest.get<Page<ConsultantInscription>>("sg/consultant-inscription?" + queryString , this.defaultHeaders()).then(
            (res: IRestResponse<Page<ConsultantInscription>>) => {
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

    static createConsultantInscription(consultantInscriptionRequest: ConsultantInscriptionCreateRequest, callback: (err: any, result: ConsultantInscription | null) => void): void {
        this.rest.create<ConsultantInscription>("sg/consultant-inscription", consultantInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<ConsultantInscription>) => {
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

    static update(id: number, consultantInscriptionRequest: ConsultantInscriptionCreateRequest, callback: (err: any, result: ConsultantInscription | null) => void): void {
        this.rest.update<ConsultantInscription>("sg/consultant-inscription/" + id, consultantInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<ConsultantInscription>) => {
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

    static delete(id: number, callback: (err: any) => void): void {
        this.rest.del<ConsultantInscription>("sg/consultant-inscription/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<ConsultantInscription>) => {
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

    static validateConsultantInscription(id: number, consultantInscriptionRequest: ConsultantInscriptionCreateRequest, callback: (err: any) => void): void {
        this.rest.create<ConsultantInscription>("sg/consultant-inscription/" + id + "/validate", consultantInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<ConsultantInscription>) => {
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

    static generateDocument(inscriptionId: number, documentTypeId: number, callback: (err: any, result: DocumentResponse | null) => void): void {
        this.rest.get<DocumentResponse>("sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId + "/generate", this.defaultHeaders()).then(
            (res: IRestResponse<DocumentResponse>) => {
                if (res.statusCode !== 200) {
                    winston.debug("Problème lors du chargement du document");
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

    static uploadDocument(inscriptionId: number, documentTypeId: number, callback: (err: any) => void): void {
        this.rest.create<DocumentResponse>("sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId, this.defaultHeaders()).then(
            (res: IRestResponse<DocumentResponse>) => {
                if (res.statusCode !== 200) {
                    winston.debug("Problème lors du chargement du document");
                    return callback(this.defaultError(res.statusCode));
                }
                winston.debug("Response : " + JSON.stringify(res));
                callback(null);
            }
        ).catch(
            e => {
                callback(e);
            }
        );
    }

    static downloadDocument(inscriptionId: number, documentTypeId: number, callback: (err: any, result: string | null) => void): void {
        this.rest.get<string>("sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId, this.defaultHeaders()).then(
            (res: IRestResponse<string>) => {
                winston.debug("download doc result : " + JSON.stringify(res));
                winston.debug("download doc result : " + res.result);
                if (res.statusCode !== 200) {
                    winston.debug("Problème lors du chargement du document");
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
