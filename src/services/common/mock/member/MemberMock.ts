import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Member } from "../../../../models/core/Member";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";

export class MemberMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/member":
        mockObj = <T> new Member(0, resources["lastName"], resources["firstName"], resources["username"], resources["genderId"], resources["email"], resources["birthday"], resources["departmentId"], resources["schoolYear"], resources["telephone"], resources["address"]["id"], resources["positionIds"]);
        status = 200;
        winston.debug("Member created : " + JSON.stringify(mockObj));
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
      case "core/member/1":
        mockObj = <T> new Member(1, "Tom", "Dupont", "tdupont", 3, "tom.dupont@test.com", "1996-08-27", 4, 3, "0607080910", 2, [3, 4]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member/2":
        mockObj = <T> new Member(2, "Pierre", "Henry", "tdupont", 1, "tom.dupont@test.com", "1996-08-27", 4, 3, "0607080910", 2, [3, 2]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member":
        mockObj = <T> new Page(<T[]> [new Member(1, "Tom", "Dupont", "tdupont", 3, "tom.dupont@test.com", "1996-08-27", 4, 3, "0607080910", 1, [3, 4]), new Member(2, "Pierre", "Henry", "phenry", 1, "pierre.henry   @test.com", "1996-08-27", 4, 3, "0607080910", 2, [3, 2])], new Meta (0, 1, 2 , 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/member":
        mockObj = <T[]> [ <T> new Member(1, "Tom", "Dupont", "tdupont", 3, "tom.dupont@test.com", "1996-08-27", 4, 3, "0607080910", 1, [3, 4]), new Member(2, "Pierre", "Henry", "phenry", 1, "tom.dupont@test.com", "1996-08-27", 4, 3, "0607080910", 2, [3, 2])];
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