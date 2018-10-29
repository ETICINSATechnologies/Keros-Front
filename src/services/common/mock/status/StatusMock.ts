import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Status } from "../../../../models/ua/Status";

export class StatusMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/status/1":
        mockObj = <T> new Status(1, "En cours");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/status/2":
        mockObj = <T> new Status(2, "A faire");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/status/3":
        mockObj = <T> new Status(3, "A valider");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/status/4":
        mockObj = <T> new Status(4, "Finie");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/status":
        mockObj = <T[]> [ <T> new Status(1, "En cours"), new Status(2, "A faire"), new Status(3, "A valider"), new Status(4, "Finie")];
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
