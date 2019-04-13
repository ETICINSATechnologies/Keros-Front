import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Pole } from "../../../../models/core/Pole";
import { MockResponse } from "../MockClient";

export class PoleMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "core/pole/1":
        mockObj = <T>new Pole(1, "RH", "Ressources Humaines");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/2":
        mockObj = <T>new Pole(2, "SI", "Système d'informations");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/3":
        mockObj = <T>new Pole(3, "UA", "Unité d'affaires");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/4":
        mockObj = <T>new Pole(4, "PF", "Performance");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/5":
        mockObj = <T>new Pole(5, "TR", "Trésorerie");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/6":
        mockObj = <T>new Pole(6, "DEVCO", "Développement Commercial");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/7":
        mockObj = <T>new Pole(7, "COM", "Communication");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "core/pole":
        mockObj = <T[]>[<T>new Pole(1, "RH", "Ressources Humaines"),
          new Pole(2, "SI", "Système d'informations"),
          new Pole(3, "UA", "Unité d'affaires"),
          new Pole(4, "PF", "Performance"),
          new Pole(5, "TR", "Trésorerie"),
          new Pole(6, "DEVCO", "Développement Commercial"),
          new Pole(7, "COM", "Communication")
        ];
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
