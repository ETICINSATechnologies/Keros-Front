import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { MockResponse } from "../MockClient";
import HttpError from "../../../../util/httpError";
import { LoginResponse } from "../../../../models/auth/LoginResponse";
import { IMock } from "../IMock";
import * as winston from "winston";

export class AuthMock implements IMock {

  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "auth/login":
        if (resources.username === "username" && resources.password === "password") {
          mockObj = <T> new LoginResponse("tokenConnexionOk");
          status = 200;
          return new MockResponse(mockObj, status);
        } else {
          return new MockResponse(null, 401);
        }
    }
    return null;
  }

  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
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
}
