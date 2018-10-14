import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../../../models/ua/Study";
import { Page } from "../../../../models/core/Page";
import { MockResponse } from "../MockClient";
import { Meta } from "../../../../models/core/Meta";
import { Department } from "../../../../models/core/Department";
import { Status } from "../../../../models/ua/Status";
import { Firm } from "../../../../models/ua/Firm";
import { ContactShort } from "../../../../models/ua/ContactShort";
import { MemberShort } from "../../../../models/core/MemberShort";
import { Gender } from "../../../../models/core/Gender";
import * as winston from "winston";

export class StudyMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/study":
        mockObj = <T> new Study(0, resources["projectNumber"], resources["name"], resources["description"], new Department(resources["departmentId"], "IF", "Informatique"), new Status(resources["statusId"], "En cours"), resources["signDate"], resources["endDate"], resources["managementFee"], resources["applicationFee"], resources["rebilledFee"], resources["archivedDate"], new Firm(resources["firmId"], "111111111", "blablabla", 2, 1), [new ContactShort(resources["contactIds"][0]), new ContactShort(resources["contactIds"][1]), new ContactShort(resources["contactIds"][2])], new MemberShort(resources["leaderId"]), [new MemberShort(resources["consultantIds"][0]), new MemberShort(resources["consultantIds"][1]), new MemberShort(resources["consultantIds"][2])], [new MemberShort(resources["qualityManagerIds"][0]), new MemberShort(resources["qualityManagerIds"][1])]);
        status = 200;
        winston.debug("Study created : " + JSON.stringify(mockObj));
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
      case "ua/study/1":
        mockObj = <T> new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Department(9, "TC", "Télécommunications, Services et Usages"), new Status(1, "En cours"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study/2":
        mockObj = <T> new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Department(2, "IF", "Informatique"), new Status(4, "Finie"), "2018-02-27", "2018-09-01", 20, 1000, 100, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(2, "Pierre", "Henry", "tdupont", new Gender(1, "H")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study":
        mockObj = <T> new Page(<T[]> [new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Department(9, "TC", "Télécommunications, Services et Usages"), new Status(1, "En cours"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Department(2, "IF", "Informatique"), new Status(4, "Finie"), "2018-02-27", "2018-09-01", 20, 1000, 100, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(2, "Pierre", "Henry", "tdupont", new Gender(1, "H")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))])], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/study":
        mockObj = <T[]> [<T> new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Department(9, "TC", "Télécommunications, Services et Usages"), new Status(1, "En cours"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Department(2, "IF", "Informatique"), new Status(4, "Finie"), "2018-02-27", "2018-09-01", 20, 1000, 100, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new ContactShort(1, "Jimmy", "Neutron", new Gender(3, "A"), "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new ContactShort(2, "José", "Bové", new Gender(4, "I"), "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], new MemberShort(2, "Pierre", "Henry", "tdupont", new Gender(1, "H")), [new MemberShort(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [ new MemberShort(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))])];
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  // TODO implement when real options is used
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }

  // TODO implement when real update is used
  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
}
