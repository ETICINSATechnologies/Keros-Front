import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Department } from "../../../../models/core/Department";

export class DepartmentMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "core/department/1":
        mockObj = <T> new Department(1, "BIM", "Biosciences");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/2":
        mockObj = <T> new Department(2, "IF", "Informatique");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/3":
        mockObj = <T> new Department(3, "GCM", "Science et Génie des Matériaux");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/4":
        mockObj = <T> new Department(4, "GCU", "Génie Civil et Urbanisme");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/5":
        mockObj = <T> new Department(5, "GE", "Génie Electrique");
          status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/6":
        mockObj = <T> new Department(6, "GEN", "Génie Energétique et Environnement");
          status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/7":
        mockObj = <T> new Department(7, "GI", "Génie Industriel");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/8":
        mockObj = <T> new Department(8, "GM", "Génie Mécanique");
          status = 200;
        return new MockResponse(mockObj, status);
      case "core/department/9":
        mockObj = <T> new Department(9, "TC", "Télécommunications, Services et Usages");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "core/department":
        mockObj = <T[]> [ <T> new Department(1, "BIM", "Biosciences"), new Department(2, "IF", "Informatique"), new Department(3, "GCM", "Science et Génie des Matériaux"), new Department(4, "GCU", "Génie Civil et Urbanisme"), new Department(5, "GE", "Génie Electrique"), new Department(6, "GEN", "Génie Energétique et Environnement"), new Department(7, "GI", "Génie Industriel"), new Department(8, "GM", "Génie Mécanique"), new Department(9, "TC", "Télécommunications, Services et Usages")];
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
