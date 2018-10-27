import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Contact } from "../../../../models/ua/Contact";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";
import { Firm } from "../../../../models/ua/Firm";
import { Gender } from "../../../../models/core/Gender";

export class ContactMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/contact":
        mockObj = <T> new Contact(0, resources["firstName"], resources["lastName"], new Gender(resources["genderId"], "I"), new Firm(resources["firmId"], "111111111", "blablabla", 2, 1), resources["email"], resources["telephone"], resources["cellphone"], resources["position"], resources["notes"], resources["old"]);
        status = 200;
        winston.debug("Contact created : " + JSON.stringify(mockObj));
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/contact/1":
        mockObj = <T> new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), new Firm(2, "1111111", "La poissonerie des familles", 2, 4), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire", "Super sympa", true);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/contact/2":
        mockObj = <T> new Contact(2, "José", "Bové", new Gender(4, "I"), new Firm(1, "99999999", "La boucherie du Léman", 1, 2), "votezjosé@test.com", "0405060708", "+33711121314", "PDG", "", false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/contact":
        mockObj = <T> new Page(<T[]> [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), new Firm(2, "1111111", "La poissonerie des familles", 2, 4), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire", "Super sympa", true), new Contact(2, "José", "Bové", new Gender(4, "I"), new Firm(1, "99999999", "La boucherie du Léman", 1, 2), "votezjosé@test.com", "0405060708", "+33711121314", "PDG", "", false)], new Meta (0, 1, 2 , 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/contact":
        mockObj = <T[]> [ <T> new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), new Firm(2, "1111111", "La poissonerie des familles", 2, 4), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire", "Super sympa", true), new Contact(2, "José", "Bové", new Gender(4, "I"), new Firm(1, "99999999", "La boucherie du Léman", 1, 2), "votezjosé@test.com", "0405060708", "+33711121314", "PDG", "", false)];
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
}