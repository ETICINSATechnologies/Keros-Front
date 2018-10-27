import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../../../models/ua/Study";
import { Page } from "../../../../models/core/Page";
import { MockResponse } from "../MockClient";
import { Meta } from "../../../../models/core/Meta";
import { Status } from "../../../../models/ua/Status";
import { Firm } from "../../../../models/ua/Firm";
import { Gender } from "../../../../models/core/Gender";
import * as winston from "winston";
import { Field } from "../../../../models/ua/Field";
import { Provenance } from "../../../../models/ua/Provenance";
import { Contact } from "../../../../models/ua/Contact";
import { Member } from "../../../../models/core/Member";

export class StudyMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "ua/study":
        mockObj = <T> new Study(0, resources["projectNumber"], resources["name"], resources["description"], new Field(resources["fieldId"], "Web"), new Status(resources["statusId"], "En cours"), new Provenance(resources["provenanceId"], "Phoning"), resources["signDate"], resources["endDate"], resources["managementFee"], resources["realizationFee"], resources["rebilledFee"], resources["ecoparticipationFee"], resources["outsourcingFee"], resources["archivedDate"], new Firm(resources["firmId"], "111111111", "blablabla", 2, 1), [new Contact(resources["contactIds"][0]), new Contact(resources["contactIds"][1]), new Contact(resources["contactIds"][2])], [new Member(resources["leaderIds"][0]), new Member(resources["leaderIds"][1]), new Member(resources["leaderIds"][2])], [new Member(resources["consultantIds"][0]), new Member(resources["consultantIds"][1]), new Member(resources["consultantIds"][2])], [new Member(resources["qualityManagerIds"][0]), new Member(resources["qualityManagerIds"][1])]);
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
        mockObj = <T> new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study/2":
        mockObj = <T> new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study":
        mockObj = <T> new Page(<T[]> [new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)]), new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)])], new Meta(0, 1, 2, 25));
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
        mockObj = <T[]> [<T> new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", 1, 2), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)]), new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", 2, 4), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)], [new Member(1, "Tom", "Dupont", "tdupont", 3), new Member(2, "Pierre", "Henry", "phenry", 1)])];
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
