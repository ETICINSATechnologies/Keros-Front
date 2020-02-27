import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import * as FormData from "form-data";
import { MemberInscription } from "../../models/sg/MemberInscription";
import { Page } from "../../models/core/Page";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { DocumentResponse } from "../../models/DocumentResponse";
import { queryStringify } from "../../util/Helper";
import { UploadedFile } from "express-fileupload";
import { Config } from "../../config/Config";

export class MemberInscriptionService extends BaseService {
    static getMemberInscription(id: number, callback: (err: any, result: MemberInscription | null) => void): void {
        this.rest.get<MemberInscription>("sg/membre-inscription/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<MemberInscription>) => {
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


    static getAllMemberInscriptions(callback: (err: any, result: Page<MemberInscription> | null) => void, queryParams?: any): void {
        const queryString = queryStringify(queryParams);
        this.rest.get<Page<MemberInscription>>("sg/membre-inscription?" + queryString, this.defaultHeaders()).then(
            (res: IRestResponse<Page<MemberInscription>>) => {
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


    static createMemberInscription(memberInscriptionRequest: MemberInscriptionCreateRequest, callback: (err: any, result: MemberInscription | null) => void): void {
        this.rest.create<MemberInscription>("sg/membre-inscription", memberInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<MemberInscription>) => {
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

    static validateMemberInscription(id: number, memberInscriptionRequest: MemberInscriptionCreateRequest, callback: (err: any) => void): void {
        this.rest.create<MemberInscription>("sg/membre-inscription/" + id + "/validate", memberInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<MemberInscription>) => {
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

    static update(id: number, memberInscriptionRequest: MemberInscriptionCreateRequest, callback: (err: any, result: MemberInscription | null) => void): void {
        this.rest.update<MemberInscription>("sg/membre-inscription/" + id, memberInscriptionRequest, this.defaultHeaders()).then(
            (res: IRestResponse<MemberInscription>) => {
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
        this.rest.del<MemberInscription>("sg/membre-inscription/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<MemberInscription>) => {
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
        this.rest.get<DocumentResponse>("sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId + "/generate", this.defaultHeaders()).then(
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

    static uploadDocument(inscriptionId: number, documentTypeId: number, file: UploadedFile, callback: (err: any) => void) {
        const formData = new FormData();
        const fs = require("fs");
        const filePath = "./";
        file.mv(filePath + file.name)
            .then(value => {
                uploadFile();
            })
            .catch(e => winston.debug("Move file to local path failed" + e));
        const uploadFile = async () => {
            const readStreamFS: ReadableStream = fs.createReadStream(filePath + file.name);
            formData.append("file", readStreamFS, file.name);
            const fetch = require("node-fetch");
            const url = Config.getBackendBaseUrl() + "/sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId;

            await fetch(url, {
                method: "POST",
                headers: this.defaultHeaders().additionalHeaders,
                body: formData
            }).then((res: { status: number; message: string }) => {
                fs.unlink(filePath + file.name, () => {
                    winston.debug("Temporarily uploaded file deleted");
                });
                if (res.status !== 200) {
                    winston.debug("Error while uploading file");
                    return callback(this.defaultError(res.status));
                }
                callback(null);
            });
        };
    }

    static downloadDocument(inscriptionId: number, documentTypeId: number, callback: (err: any, result: DocumentResponse | null) => void): void {
        this.rest.get<DocumentResponse>("sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId, this.defaultHeaders()).then(
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
}
