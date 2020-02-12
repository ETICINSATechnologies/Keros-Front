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
import Length = Chai.Length;

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
      file.mv("./" + file.name)
          .then(value => {
              uploadFile();
          })
          .catch(e => winston.debug("move file failed" + e));
      // emlever multer
      const uploadFile = async () => {
           const readStreamFS: ReadableStream = fs.createReadStream("./" + file.name);
          winston.debug("buffer size before sending it: " + file.data.length);

          winston.info("readable stream fs before sending it: " + JSON.stringify(readStreamFS));
          formData.append("file", readStreamFS, file.name);
          winston.debug("file data before sending it: " + JSON.stringify(file.data));
          winston.debug("formdata before sending it: " + JSON.stringify(formData));
          const fetch = require("node-fetch");
          const url = Config.getBackendBaseUrl() + "/sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId;
          const headersToken = this.defaultHeaders().additionalHeaders;

          if (headersToken && headersToken.Authorization) {
              winston.debug("headers before sending it: " + JSON.stringify(headersToken));
              await fetch(url, {
                  method: "POST",
                  headers: this.defaultHeaders().additionalHeaders,
                  body: formData
              }).
              then((res: { status: number; message: string }) => {
                  winston.debug("Response : " + JSON.stringify(res));
                  winston.debug("code : " + JSON.stringify(res.status));
                  fs.unlink("./" + file.name, () => {console.log("Deleted"); });
                  if (res.status !== 200) {
                      winston.debug("Problème lors du chargement du document");
                      return callback(this.defaultError(res.status));
                  }
                  callback(null);
              });
          }
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
