import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Position } from "../../../../models/core/Position";
import { Pole } from "../../../../models/core/Pole";

export class PositionMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/position/1":
        mockObj = <T>new Position(1, "Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/2":
        mockObj = <T>new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/3":
        mockObj = <T>new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/4":
        mockObj = <T>new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/5":
        mockObj = <T>new Position(5, "Senior SI", 2018, true, new Pole(2, "SI", "Système d'informations"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/6":
        mockObj = <T>new Position(6, "Junior SI", 2018, true, new Pole(2, "SI", "Système d'informations"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/7":
        mockObj = <T>new Position(7, "Chargé d'affaire", 2018, true, new Pole(3, "UA", "Unité d'affaires"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/8":
        mockObj = <T>new Position(8, "Responsable Performance", 2018, true, new Pole(4, "PF", "Performance"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/9":
        mockObj = <T>new Position(9, "Trésorier(e)", 2018, true, new Pole(5, "TR", "Trésorerie"));
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
        mockObj = <T[]>[<T>new Position(1, "Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations")), new Position(5, "Senior SI", 2018, true, new Pole(2, "SI", "Système d'informations")), new Position(6, "Junior SI", 2018, true, new Pole(2, "SI", "Système d'informations")), new Position(7, "Chargé d'affaire", 2018, true, new Pole(3, "UA", "Unité d'affaires")), new Position(8, "Responsable Performance", 2018, true, new Pole(4, "PF", "Performance")), new Position(9, "Trésorier(e)", 2018, true, new Pole(5, "TR", "Trésorerie"))];
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
