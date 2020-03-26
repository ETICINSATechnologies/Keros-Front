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
import { Config } from "../../config/Config";
import * as FormData from "form-data";
import { UploadedFile } from "express-fileupload";

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
      // const formData = new FormData();
      // const fs = require("fs");
      // const filePath = "./";
      // file.mv(filePath + file.name)
      //   .then(value => {
      //     uploadFile();
      //   })
      //   .catch(e => winston.debug("Move file to local path failed" + e));
      // const uploadFile = async () => {
      //   const readStreamFS: ReadableStream = fs.createReadStream(filePath + file.name);
      //   formData.append("file", readStreamFS, file.name);
      //   const fetch = require("node-fetch");
      //   const url = Config.getBackendBaseUrl() + "/sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId;
      //   await fetch(url, {
      //     method: "POST",
      //     headers: this.defaultHeaders().additionalHeaders,
      //     body: formData
      //   }).then((res: { status: number; message: string }) => {
      //     fs.unlink(filePath + file.name, () => {
      //       winston.debug("Temporarily uploaded file deleted");
      //     });
      //     if (res.status !== 201) {
      //       winston.debug("Error while uploading file");
      //       return callback(this.defaultError(res.status));
      //     }
      //     callback(null);
      //   });
      // };
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

    static validateConsultantInscription(id: number, callback: (err: any) => void): void {
        this.rest.create<ConsultantInscription>("sg/consultant-inscription/" + id + "/validate", null, this.defaultHeaders()).then(
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

    static uploadDocument(inscriptionId: number, documentTypeId: number, file: UploadedFile, callback: (err: any) => void): void {
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
            const url = Config.getBackendBaseUrl() + "/sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId;
            await fetch(url, {
                method: "POST",
                headers: this.defaultHeaders().additionalHeaders,
                body: formData
            }).then((res: { status: number; message: string }) => {
                fs.unlink(filePath + file.name, () => {
                    winston.debug("Temporarily uploaded file deleted");
                });
                if (res.status !== 201) {
                    winston.debug("Error while uploading file");
                    return callback(this.defaultError(res.status));
                }
                callback(null);
            });
        };
    }

    static downloadDocument(inscriptionId: number, documentTypeId: number, callback: (err: any, options: {url: string, headers: Object}) => void): void {
        const defaultHeaders = this.defaultHeaders();
        let authToken = "null";
        if (defaultHeaders.additionalHeaders) {
            authToken = defaultHeaders.additionalHeaders.Authorization;
        }
        const options = {
            url : Config.getBackendBaseUrl() + "/sg/consultant-inscription/" + inscriptionId + "/document/" + documentTypeId,
            headers : {
                Authorization : authToken
            }
        };
        callback(null, options);
    }
}
