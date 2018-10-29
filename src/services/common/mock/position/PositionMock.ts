import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Position } from "../../../../models/core/Position";

export class PositionMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/position/1":
        mockObj = <T>new Position(1, "Président(e)", 1);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/2":
        mockObj = <T> new Position(2, "Vice-Président(e)", 1);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/3":
        mockObj = <T> new Position(3, "Secretaire Générale", 1);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/4":
        mockObj = <T> new Position(4, "Responsable SI", 2);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/5":
        mockObj = <T> new Position(5, "Senior SI", 2);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/6":
        mockObj = <T> new Position(6, "Junior SI", 2);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/7":
        mockObj = <T> new Position(7, "Chargé d'affaire", 3);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/8":
        mockObj = <T> new Position(8, "Responsable Performance", 4);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/9":
        mockObj = <T> new Position(9, "Trésorier(e)", 5);
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/position":
        mockObj = <T[]> [ <T> new Position(1, "Président(e)", 1), new Position(2, "Vice-Président(e)", 1), new Position(3, "Secretaire Générale", 1), new Position(4, "Responsable SI", 2), new Position(5, "Senior SI", 2), new Position(6, "Junior SI", 2), new Position(7, "Chargé d'affaire", 3), new Position(8, "Responsable Performance", 4), new Position(9, "Trésorier(e)", 5)];
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
