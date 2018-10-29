import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Address } from "../../../../models/core/Address";
import * as winston from "winston";
export class AddressMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/address/1":
        mockObj = <T> new Address(1, "37, rue des Lilas", "", "01220", "Grilly", 1);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/address/2":
        mockObj = <T> new Address(1, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", 2);
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    return null;
  }
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/address":
        mockObj = <T> new Address(0, resources["line1"], resources["line2"], resources["city"], resources["postalCode"], resources["countryId"]);
        status = 200;
        winston.debug("Address created : " + JSON.stringify(mockObj));
        return new MockResponse(mockObj, status);
    }
    return null;
  }
}