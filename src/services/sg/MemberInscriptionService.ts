import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { MemberInscription } from "../../models/sg/MemberInscription";
import { Page } from "../../models/core/Page";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { DocumentResponse } from "../../models/DocumentResponse";

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

  static uploadDocument(inscriptionId: number, documentTypeId: number, callback: (err: any) => void): void {
    this.rest.create<DocumentResponse>("sg/membre-inscription/" + inscriptionId + "/document/" + documentTypeId, this.defaultHeaders()).then(
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