import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Gender } from "../../../../models/core/Gender";

export class GenderMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/gender":
        mockObj = <T[]> [ <T> new Gender(1, "H"), new Gender(2, "F"), new Gender(3, "A"), new Gender(4, "I")];
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
