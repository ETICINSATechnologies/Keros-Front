import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Firm } from "../../../../models/ua/Firm";
import { Page } from "../../../../models/core/Page";
import { MockResponse } from "../MockClient";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";

export class FirmMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm":
        mockObj = <T> new Firm(0, resources["siret"], resources["name"], resources["address"]["id"], resources["typeId"]);
        status = 200;
        winston.debug("Firm created : " + JSON.stringify(mockObj));
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
      case "ua/firm/1":
        mockObj = <T> new Firm(1, "99999999", "La boucherie du Léman", 1, 2);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm/2":
        mockObj = <T> new Firm(2, "1111111", "La poissonerie des familles", 2, 4);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm":
        mockObj = <T> new Page(<T[]> [new Firm(1, "99999999", "La boucherie du Léman", 4, 2), new Firm(2, "11111111", "La poissonerie des familles", 2, 6)], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm":
        mockObj = <T[]> [<T> new Firm(1, "99999999", "La boucherie du Léman", 1, 2), new Firm(2, "11111111", "La poissonerie des familles", 2, 4)];
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
