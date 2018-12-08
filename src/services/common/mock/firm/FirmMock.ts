import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Firm } from "../../../../models/ua/Firm";
import { Page } from "../../../../models/core/Page";
import { MockResponse } from "../MockClient";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";
import { Address } from "../../../../models/core/Address";
import { Country } from "../../../../models/core/Country";
import { FirmType } from "../../../../models/ua/FirmType";

export class FirmMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm":
        mockObj = <T> new Firm(0, resources["siret"], resources["name"], resources["address"], new FirmType(resources["typeId"], "SARL"));
        status = 201;
        winston.debug("Firm created : " + JSON.stringify(mockObj));
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
      case "ua/firm/1":
        mockObj = <T> new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/PMI"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm/2":
        mockObj = <T> new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm":
        mockObj = <T> new Page(<T[]> [new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/PMI")), new Firm(2, "11111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL"))], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm":
        mockObj = <T[]> [<T> new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/PMI")), new Firm(2, "11111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL"))];
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/firm/1":
        mockObj = <T> new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/PMI"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/firm/2":
        mockObj = <T> new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL"));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
}
