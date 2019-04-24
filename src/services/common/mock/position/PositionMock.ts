import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Position } from "../../../../models/core/Position";
import { Pole } from "../../../../models/core/Pole";

export class PositionMock implements IMock {
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "core/position/1":
        mockObj = <T>new Position(1, "Auditeur orga", 2018, false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/2":
        mockObj = <T>new Position(2, "Auditeur treso", 2018, false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/3":
        mockObj = <T>new Position(3, "Chargé d'affaires", 2018, false, new Pole(3, "DevCo", "Développement Commercial"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/4":
        mockObj = <T>new Position(4, "Chef de projets", 2018, false, new Pole(9, "UA", "Unité d'affaires"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/5":
        mockObj = <T>new Position(5, "Comptable", 2018, false, new Pole(8, "Treso", "Trésorerie"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/6":
        mockObj = <T>new Position(6, "Consultant", 2018, false, new Pole(2, "Cons", "Consultant"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/7":
        mockObj = <T>new Position(7, "Junior Com", 2018, false, new Pole(1, "Com", "Communication"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/8":
        mockObj = <T>new Position(8, "Junior DevCo", 2018, false, new Pole(3, "DevCo", "Développement Commercial"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/9":
        mockObj = <T>new Position(9, "Junior qualité", 2018, false, new Pole(4, "Perf", "Performance"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/10" :
        mockObj = <T>new Position(10, "Junior SI", 2018, false, new Pole(7, "SI", "Systèmes d'Information"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/11" :
        mockObj = <T>new Position(11, "Junior UA", 2018, false, new Pole(9, "UA", "Unité d'affaires"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/12" :
        mockObj = <T>new Position(12, "Membre CNJE", 2018, false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/13" :
        mockObj = <T>new Position(13, "Membre d'Honneur", 2018, false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/14" :
        mockObj = <T>new Position(14, "Président(e)", 2018, true, new Pole(5, "Prez", "Présidence"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/15" :
        mockObj = <T>new Position(15, "Responsable BU", 2018, false, new Pole(9, "UA", "Unité d'affaires"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/16" :
        mockObj = <T>new Position(16, "Responsable Com", 2018, true, new Pole(1, "Com", "Communication"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/17" :
        mockObj = <T>new Position(17, "Responsable DevCo", 2018, true, new Pole(3, "DevCo", "Développement Commercial"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/18" :
        mockObj = <T>new Position(18, "Responsable qualité", 2018, true, new Pole(4, "Perf", "Performance"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/19" :
        mockObj = <T>new Position(19, "Responsable RH", 2018, true, new Pole(6, "RH", "Ressources Humaines"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/20" :
        mockObj = <T>new Position(20, "Responsable SI", 2018, true, new Pole(7, "SI", "Systèmes d'Information"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/21" :
        mockObj = <T>new Position(21, "Responsable UA", 2018, true, new Pole(9, "UA", "Unité d'affaires"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/22" :
        mockObj = <T>new Position(22, "Secrétaire Général(e)", 2018, true, new Pole(6, "RH", "Ressources Humaines"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/23" :
        mockObj = <T>new Position(23, "Trésorier", 2018, true, new Pole(8, "Treso", "Trésorerie"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/24" :
        mockObj = <T>new Position(24, "Vice-Président(e)", 2018, true, new Pole(5, "Prez", "Présidence"));
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/position/25" :
        mockObj = <T>new Position(25, "Vice-Trésorier", 2018, true, new Pole(8, "Treso", "Trésorerie"));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "core/position":
        mockObj = <T[]>[<T>new Position(1, "Auditeur orga", 2018, false),
          new Position(2, "Auditeur treso", 2018, false),
          new Position(3, "Chargé d'affaires", 2018, false, new Pole(3, "DevCo", "Développement Commercial")),
          new Position(4, "Chef de projets", 2018, false, new Pole(9, "UA", "Unité d'affaires")),
          new Position(5, "Comptable", 2018, false, new Pole(8, "Treso", "Trésorerie")),
          new Position(6, "Consultant", 2018, false, new Pole(2, "Cons", "Consultant")),
          new Position(7, "Junior Com", 2018, false, new Pole(1, "Com", "Communication")),
          new Position(8, "Junior DevCo", 2018, false, new Pole(3, "DevCo", "Développement Commercial")),
          new Position(9, "Junior qualité", 2018, false, new Pole(4, "Perf", "Performance")),
          new Position(10, "Junior SI", 2018, false, new Pole(7, "SI", "Systèmes d'Information")),
          new Position(11, "Junior UA", 2018, false, new Pole(9, "UA", "Unité d'affaires")),
          new Position(12, "Membre CNJE", 2018, false),
          new Position(13, "Membre d'Honneur", 2018, false),
          new Position(14, "Président(e)", 2018, true, new Pole(5, "Prez", "Présidence")),
          new Position(15, "Responsable BU", 2018, false, new Pole(9, "UA", "Unité d'affaires")),
          new Position(16, "Responsable Com", 2018, true, new Pole(1, "Com", "Communication")),
          new Position(17, "Responsable DevCo", 2018, true, new Pole(3, "DevCo", "Développement Commercial")),
          new Position(18, "Responsable qualité", 2018, true, new Pole(4, "Perf", "Performance")),
          new Position(19, "Responsable RH", 2018, true, new Pole(6, "RH", "Ressources Humaines")),
          new Position(20, "Responsable SI", 2018, true, new Pole(7, "SI", "Systèmes d'Information")),
          new Position(21, "Responsable UA", 2018, true, new Pole(9, "UA", "Unité d'affaires")),
          new Position(22, "Secrétaire Général(e)", 2018, true, new Pole(6, "RH", "Ressources Humaines")),
          new Position(23, "Trésorier", 2018, true, new Pole(8, "Treso", "Trésorerie")),
          new Position(24, "Vice-Président(e)", 2018, true, new Pole(5, "Prez", "Présidence")),
          new Position(25, "Vice-Trésorier", 2018, true, new Pole(8, "Treso", "Trésorerie"))
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
