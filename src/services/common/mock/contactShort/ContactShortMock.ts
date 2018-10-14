import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import * as winston from "winston";
import { Gender } from "../../../../models/core/Gender";
import { ContactShort } from "../../../../models/ua/ContactShort";

export class ContactShortMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "contactShort/1":
        mockObj = <T> new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire");
        status = 200;
        return new MockResponse(mockObj, status);
      case "contactShort/2":
        mockObj = <T> new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "contactShort":
        mockObj = <T[]> [ <T> new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")];
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