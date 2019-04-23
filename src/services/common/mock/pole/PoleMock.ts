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
        mockObj = <T>new Pole(1, "Com", "Communication");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/2":
        mockObj = <T>new Pole(2, "Cons", "Consultant");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/3":
        mockObj = <T>new Pole(3, "DevCo", "Développement Commercial");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/4":
        mockObj = <T>new Pole(4, "Perf", "Performance");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/5":
        mockObj = <T>new Pole(5, "Prez", "Présidence");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/6":
        mockObj = <T>new Pole(6, "RH", "Ressources Humaines");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/7":
        mockObj = <T>new Pole(7, "SI", "Systèmes d'Information");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/8":
        mockObj = <T>new Pole(8, "Treso", "Trésorerie");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/pole/9":
        mockObj = <T>new Pole(9, "UA", "Unité d'affaires");
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
        mockObj = <T[]>[<T>new Pole(1, "Com", "Communication"),
          new Pole(2, "Cons", "Consultant"),
          new Pole(3, "DevCo", "Développement Commercial"),
          new Pole(4, "Perf", "Performance"),
          new Pole(5, "Prez", "Présidence"),
          new Pole(6, "RH", "Ressources Humaines"),
          new Pole(7, "SI", "Systèmes d'Information"),
          new Pole(8, "Treso", "Trésorerie"),
          new Pole(9, "UA", "Unité d'affaires")
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
