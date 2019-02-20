import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { Contact } from "../../models/ua/Contact";
import { ContactCreateRequest } from "../../models/ua/ContactCreateRequest";
import * as winston from "winston";
import { queryStringify } from '../../util/Helper';

export class ContactService extends BaseService {
  static getContact(id: number, callback: (err: any, result: Contact | null) => void): void {
    this.rest.get<Contact>("ua/contact/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Contact>) => {
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

  static getAllContacts(callback: (err: any, result: Page<Contact> | null) => void, queryParams?: any): void {
    const queryString = queryStringify(queryParams);
    this.rest.get<Page<Contact>>("ua/contact?" + queryString, this.defaultHeaders()).then(
      (res: IRestResponse<Page<Contact>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        let totalPages = 1;
        if (res.result && res.result.meta && res.result.meta.totalPages) {
          totalPages = res.result.meta.totalPages;
        }
        if (totalPages !== 1) {
          let pageCount = 1;
          while (totalPages - pageCount !== 0) {
            this.rest.get<Page<Contact>>("ua/contact?pageNumber=" + pageCount + queryString, this.defaultHeaders()).then(
              (resu: IRestResponse<Page<Contact>>) => {
                if (resu.statusCode !== 200) {
                  return callback(this.defaultError(resu.statusCode), null);
                }
                winston.debug('Response for page ' + pageCount + ' : ' + JSON.stringify(resu));
                if (res.result && res.result.content && resu.result && resu.result.content) {
                  res.result.content = res.result.content.concat(resu.result.content);
                  callback(null, res.result);
                }
              }).catch(e => callback(e, null)
            );
            pageCount += 1;
          }
        } else {
          callback(null, res.result);
        }
      }
      ).catch(
        e => callback(e, null)
    );
  }

  static createContact(contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.create<ContactCreateRequest>("ua/contact", contactRequest, this.defaultHeaders()).then(
      (res: IRestResponse<ContactCreateRequest>) => {
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

  static update(id: number, contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.update<ContactCreateRequest>("ua/contact/" + id, contactRequest, this.defaultHeaders()).then(
      (res: IRestResponse<ContactCreateRequest>) => {
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
    this.rest.del<Contact>("ua/contact/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Contact>) => {
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
