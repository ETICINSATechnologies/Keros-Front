import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { MemberInscription } from "../../models/sg/MemberInscription";
import { Page } from "../../models/core/Page";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { DocumentResponse } from "../../models/DocumentResponse";
import { UploadedDocument } from "../../models/UploadedDocument";
import * as FormData from "form-data";
import { Config } from "../../config/Config";
import * as httpContext from "express-http-context";
import HttpError from "../../util/httpError";
import * as fs from "fs";
import * as request from "request";
const fetch = require('node-fetch');

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

  static getAllMemberInscriptions(callback: (err: any, result: Page<MemberInscription> | null) => void): void {
    this.rest.get<Page<MemberInscription>>("sg/membre-inscription" , this.defaultHeaders()).then(
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

  static uploadDocument(inscriptionId: number, documentTypeId: number, path: string, callback: (err: any) => void): void {
    /**
    const formData = {
      file: fs.createReadStream(path)
    };
    request.post({url: "http://pre-keros-api.etic-insa.com/api/v1/sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId, headers: {Authorization: httpContext.get("token")}, formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log(httpResponse);
      console.log('Upload successful!  Server responded with:', body);
      winston.debug("BODY : " + JSON.stringify(body));
      callback(null);
    });**/

    const file = new FormData();

    file.append("file", fs.createReadStream(path));
  /**
    const options = {
      method: "POST",
      body: file,
      headers: {Authorization: httpContext.get("token")}
    };

    fetch("http://pre-keros-api.etic-insa.com/api/v1/sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId, options)
      .then((response: any) => response.json())
      .then((res: any) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors du chargement du document");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }).catch(
       (e: any) => {
          callback(e);
        }
      );**/

    file.submit({
      host: "pre-keros-api.etic-insa.com",
      path: "/api/v1/sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId,
      headers: {Authorization: httpContext.get("token")}
    }, function(err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200) {
        winston.debug("Problème lors du chargement du document");
        return callback(new HttpError("Erreur de connection avec le back (Status: " + res.statusCode + ")", <number>res.statusCode));
      }
      winston.debug("Response : " + JSON.stringify(res));
      callback(null);
    });
    /**
    this.rest.create<DocumentResponse>("sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId, file, this.defaultHeaders()).then(
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
    );**/
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
