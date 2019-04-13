import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Field } from "../../../../models/ua/Field";

export class FieldMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "ua/field/1":
        mockObj = <T> new Field(1, "Mécanique");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/field/2":
        mockObj = <T> new Field(2, "Web");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/field/3":
        mockObj = <T> new Field(3, "Réseau");
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/field/4":
        mockObj = <T> new Field(4, "Télécommunication");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "ua/field":
        mockObj = <T[]> [ <T> new Field(1, "Mécanique"), new Field(2, "Web"), new Field(3, "Réseau"), new Field(4, "Télécommunication")];
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
