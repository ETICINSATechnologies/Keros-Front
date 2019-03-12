import { IRestResponse } from "typed-rest-client/RestClient";
import { Facture } from "../../models/treso/Facture";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { FactureCreateRequest } from "../../models/treso/FactureCreateRequest";
import * as winston from "winston";
import { FactureDocument } from "../../models/treso/FactureDocument";

export class FactureService extends BaseService {

  static getFacture(id: number, callback: (err: any, result: Facture | null) => void): void {
    this.rest.get<Facture>("treso/facture/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Facture>) => {
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

  static getAllFactures(callback: (err: any, result: Page<Facture> | null) => void): void {
    this.rest.get<Page<Facture>>("treso/facture", this.defaultHeaders()).then(
      (res: IRestResponse<Page<Facture>>) => {
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

  static createFacture(factureRequest: FactureCreateRequest, callback: (err: any) => void): void {
    this.rest.create<FactureCreateRequest>("treso/facture", factureRequest, this.defaultHeaders()).then(
      (res: IRestResponse<FactureCreateRequest>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(id: number, factureRequest: FactureCreateRequest, callback: (err: any) => void): void {
    this.rest.update<Facture>("treso/facture/" + id, factureRequest, this.defaultHeaders()).then(
      (res: IRestResponse<Facture>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static delete(id: number, callback: (err: any) => void): void {
    this.rest.del<Facture>("treso/facture/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Facture>) => {
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

  static validateUa(id: number, callback: (err: any) => void): void {
    this.rest.create<Facture>("treso/facture/" + id + "/validate-ua", this.defaultHeaders()).then(
      (res: IRestResponse<Facture>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors de la validation");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("La facture " + id + " a été validée par l'UA");
        callback(null);
      }
    ).catch(
      e => {
        callback(e);
      }
    );
  }

  static validatePerf(id: number, callback: (err: any) => void): void {
    this.rest.create<Facture>("treso/facture/" + id + "/validate-perf", this.defaultHeaders()).then(
      (res: IRestResponse<Facture>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors de la validation");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("La facture " + id + " a été validée par la Perfo");
        callback(null);
      }
    ).catch(
      e => {
        callback(e);
      }
    );
  }

  static getFactureDocument(id: number, callback: (err: any, result: FactureDocument | null) => void): void {
    this.rest.get<FactureDocument>("treso/facture/" + id + "/generateDocument", this.defaultHeaders()).then(
      (res: IRestResponse<FactureDocument>) => {
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