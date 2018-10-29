import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { FirmType } from "../../../../models/ua/FirmType";

export class FirmTypeMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm-type/1":
        mockObj = <T> new FirmType(1, "TPE");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm-type/2":
        mockObj = <T> new FirmType(2, "PME/PMI");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm-type/3":
        mockObj = <T> new FirmType(3, "GE");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm-type/4":
        mockObj = <T> new FirmType(4, "SARL");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm-type/5":
        mockObj = <T> new FirmType(5, "SA");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm-type/6":
        mockObj = <T> new FirmType(6, "SAS");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm-type":
        mockObj = <T[]> [ <T> new FirmType(1, "TPE"), new FirmType(2, "PME/PMI"), new FirmType(3, "GE"), new FirmType(4, "SARL"), new FirmType(5, "SA"), new FirmType(6, "SAS")];
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

  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
}
