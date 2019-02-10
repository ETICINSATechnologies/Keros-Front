import { IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../models/ua/Study";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { StudyCreateRequest } from "../../models/ua/StudyCreateRequest";
import * as winston from "winston";
import { StudyDocumentResponse } from '../../models/ua/StudyDocumentResponse';

export class StudyService extends BaseService {
    static getStudy(id: number, callback: (err: any, result: Study | null) => void): void {
        this.rest.get<Study>("ua/study/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<Study>) => {
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

  static getStudyDocuments(id: number, callback: (err: any, result: StudyDocumentResponse | null) => void): void {
    this.rest.get<StudyDocumentResponse>("ua/study/" + id + "/documents", this.defaultHeaders()).then(
      (res: IRestResponse<StudyDocumentResponse>) => {
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

    static getAllStudies(callback: (err: any, result: Page<Study> | null) => void): void {
        this.rest.get<Page<Study>>("ua/study", this.defaultHeaders()).then(
            (res: IRestResponse<Page<Study>>) => {
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

    static createStudy(studyRequest: StudyCreateRequest, callback: (err: any) => void): void {
        this.rest.create<StudyCreateRequest>("ua/study", studyRequest, this.defaultHeaders()).then(
            (res: IRestResponse<StudyCreateRequest>) => {
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

    static update(id: number, studyRequest: StudyCreateRequest, callback: (err: any) => void): void {
      this.rest.update<Study>("ua/study/" + id, studyRequest, this.defaultHeaders()).then(
        (res: IRestResponse<Study>) => {
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

    static getAllStudiesForConnectedUser(callback: (err: any, result: Page<Study> | null) => void): void {
      this.rest.get<Page<Study>>("ua/study/me", this.defaultHeaders()).then(
        (res: IRestResponse<Page<Study>>) => {
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
        this.rest.del<Study>("ua/study/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<Study>) => {
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