import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../../../models/ua/Study";
import { Page } from "../../../../models/core/Page";
import { MockResponse } from "../MockClient";
import { Meta } from "../../../../models/core/Meta";

export class StudyMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "study":
        mockObj = <T> new Study(1, "Etude 1");
        status = 200;
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
      case "study/1":
        mockObj = <T> new Study(1, "Etude 1");
        status = 200;
        return new MockResponse(mockObj, status);
      case "study/2":
        mockObj = <T> new Study(2, "Etude 2");
        status = 200;
        return new MockResponse(mockObj, status);
      case "study":
        mockObj = <T> new Page(<T[]> [new Study(1, "Etude 1"), new Study(2, "Etude 2")], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "study":
        mockObj = <T[]> [<T> new Study(1, "Etude 1"), new Study(2, "Etude 2")];
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  // TODO implement when real options is used
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  // TODO implement when real update is used
  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
}
