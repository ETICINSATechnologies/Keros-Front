import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import * as winston from "winston";
import { MemberShort } from "../../../../models/core/MemberShort";
import { Gender } from "../../../../models/core/Gender";

export class MemberShortMock implements IMock {
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
      case "memberShort/1":
        mockObj = <T> new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "memberShort/2":
        mockObj = <T> new MemberShort(2, "Pierre", "Henry", "tdupont", new Gender(1, "H"));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "memberShort":
        mockObj = <T[]> [ <T> new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))];
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