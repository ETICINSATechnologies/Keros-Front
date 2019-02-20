import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Member } from "../../../../models/core/Member";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";
import { Gender } from "../../../../models/core/Gender";
import { Department } from "../../../../models/core/Department";
import { Position } from "../../../../models/core/Position";
import { Address } from "../../../../models/core/Address";
import { Country } from "../../../../models/core/Country";
import { Pole } from "../../../../models/core/Pole";

export class MemberMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/member":
        mockObj = <T>new Member(0, resources["lastName"], resources["firstName"], resources["username"],
          new Gender(resources["genderId"], "A"), resources["email"], resources["birthday"],
          new Department(resources["departmentId"], "TC"), resources["schoolYear"], resources["telephone"], resources["address"],
          [new Position(resources["positions"][0]["id"], "Secretaire Général", resources["positions"][0]["year"], resources["positions"][0]["isBoard"], new Pole(1, "RH", "Ressources Humaines")),
            new Position(resources["positions"][1]["id"], "Président(e)", resources["positions"][1]["year"], resources["positions"][1]["isBoard"], new Pole(1, "RH", "Ressources Humaines")),
            new Position(resources["positions"][2]["id"], "Vice-Président(e)", resources["positions"][2]["year"], resources["positions"][2]["isBoard"], new Pole(1, "RH", "Ressources Humaines"))]);
        status = 201;
        winston.debug("Member created : " + JSON.stringify(mockObj));
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let status: number = 500;
    switch (resource) {
      case "core/member/1":
        status = 204;
        winston.debug("Member 1 removed");
        return new MockResponse(null, status);
      case "core/member/2":
        status = 204;
        winston.debug("Member 2 removed");
        return new MockResponse(null, status);
    }
    return null;
  }
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "core/member/me":
        mockObj = <T>new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2019, false, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member/1":
        mockObj = <T>new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2015, true, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2019, false, new Pole(2, "SI", "Système d'informations"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member/2":
        mockObj = <T>new Member(2, "Pierre", "Henry", "tdupont", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2017, true, new Pole(1, "RH", "Ressources Humaines"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member":
        mockObj = <T>new Page(<T[]>[new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2017, false, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "pierre.henry   @test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))])], new Meta(2, 5, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    if (resource.startsWith("core/member?")) {
      switch (resource) {
        case "core/member?pageNumber=0":
          mockObj = <T>new Page(<T[]>[new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2018, false, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "pierre.henry   @test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))])], new Meta(2, 5, 2, 25));
          status = 200;
          return new MockResponse(mockObj, status);
        case "core/member?pageNumber=1":
          mockObj = <T>new Member(2, "Pierre", "Henry", "tdupont", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2017, true, new Pole(1, "RH", "Ressources Humaines"))]);
          status = 200;
          return new MockResponse(mockObj, status);
      }
      mockObj = <T>new Page(<T[]>[new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2018, false, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "pierre.henry   @test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))])], new Meta(2, 5, 2, 25));
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
        mockObj = <T[]>[<T>new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))])];
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
      case "core/member/1":
        mockObj = <T>new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "core/member/2":
        mockObj = <T>new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(4, "Responsable SI", 2018, true, new Pole(2, "SI", "Système d'informations"))]), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), [new Position(3, "Secretaire Générale", 2018, true, new Pole(1, "RH", "Ressources Humaines")), new Position(2, "Vice-Président(e)", 2018, true, new Pole(1, "RH", "Ressources Humaines"))]);
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
}