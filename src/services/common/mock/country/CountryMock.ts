import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Country } from "../../../../models/core/Country";

export class CountryMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "core/country/1":
        mockObj = <T> new Country(1, "France");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/country/2":
        mockObj = <T> new Country(2, "Suisse");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/country/3":
        mockObj = <T> new Country(3, "Belgique");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/country/4":
        mockObj = <T> new Country(4, "Allemagne");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/country/5":
        mockObj = <T> new Country(5, "Espagne");
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/country/6":
        mockObj = <T> new Country(6, "Royaume-Uni");
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "core/country":
        mockObj = <T[]> [ <T> new Country(1, "France"), new Country(2, "Suisse"), new Country(3, "Belgique"), new Country(4, "Allemagne"), new Country(5, "Espagne"), new Country(6, "Royaume-Uni")];
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
