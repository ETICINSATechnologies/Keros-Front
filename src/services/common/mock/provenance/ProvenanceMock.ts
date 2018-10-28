import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Provenance } from "../../../../models/ua/Provenance";

export class ProvenanceMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "provenance/1":
        mockObj = <T> new Provenance(1, "Mail");
        status = 200;
        return new MockResponse(mockObj, status);
      case "provenance/2":
        mockObj = <T> new Provenance(2, "Letter");
        status = 200;
        return new MockResponse(mockObj, status);
      case "provenance/3":
        mockObj = <T> new Provenance(3, "Network");
        status = 200;
        return new MockResponse(mockObj, status);
      case "provenance/4":
        mockObj = <T> new Provenance(4, "Phoning");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "provenance":
        mockObj = <T[]> [ <T> new Provenance(1, "Mail"), new Provenance(2, "Letter"), new Provenance(3, "Network"), new Provenance(4, "Phoning")];
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
