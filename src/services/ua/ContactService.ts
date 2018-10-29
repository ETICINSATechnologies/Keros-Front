import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { Contact } from "../../models/ua/Contact";
import { ContactCreateRequest } from "../../models/ua/ContactCreateRequest";

export class ContactService extends BaseService {
  static getContact(id: number, callback: (err: any, result: Contact | null) => void): void {
    this.rest.get<Contact>("ua/contact/" + id).then(
      (res: IRestResponse<Contact>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getContact response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllContacts(callback: (err: any, result: Page<Contact> | null) => void): void {
    this.rest.get<Page<Contact>>("ua/contact").then(
      (res: IRestResponse<Page<Contact>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllContacts response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createContact(contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.create<ContactCreateRequest>("ua/contact", contactRequest).then(
      (res: IRestResponse<ContactCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("createContact response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.create<ContactCreateRequest>("ua/contact", contactRequest).then(
      (res: IRestResponse<ContactCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError());
        }
        winston.debug("update contact response with status " + res.statusCode);
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}
