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
import { FirmType } from "../../../../models/ua/FirmType";
import { Address } from "../../../../models/core/Address";
import { Country } from "../../../../models/core/Country";
import { Document } from "../../../../models/Document";
import { DocumentResponse } from "../../../../models/DocumentResponse";

export class StudyMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "ua/study":
        const consultants: Member[] = [];
        resources.consultantIds.forEach(function(elem: number) {
          consultants.push(new Member(elem));
        });
        mockObj = <T> new Study(0, resources.name, resources.description, new Field(resources.fieldId, "Web"), new Status(resources.statusId, "En cours"), new Provenance(resources.provenanceId, "Phoning"), resources.signDate, resources.endDate, resources.managementFee, resources.realizationFee, resources.rebilledFee, resources.ecoparticipationFee, resources.outsourcingFee, resources.archivedDate, new Firm(resources.firmId, "111111111", "blablabla", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(4, "SARL")), [new Contact(resources.contactIds[0]), new Contact(resources.contactIds[1]), new Contact(resources.contactIds[2])], [new Member(resources.leaderIds[0]), new Member(resources.leaderIds[1]), new Member(resources.leaderIds[2])], consultants, [new Member(resources.qualityManagerIds[0]), new Member(resources.qualityManagerIds[1])], true);
        status = 201;
        winston.debug("Study created : " + JSON.stringify(mockObj));
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let status = 500;
    switch (resource) {
      case "ua/study/1":
        status = 204;
        winston.debug("Study 1 removed");
        return new MockResponse(null, status);
      case "ua/study/2":
        status = 204;
        winston.debug("Study 2 removed");
        return new MockResponse(null, status);
    }
    return null;
  }
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    if (resource.match(/document\/2/)) {
      mockObj = <T> new DocumentResponse("http://keros-api-dev.etic-insa.com/generated/87c8d206-e4d8-4c0c-973f-f067026b498b");
      status = 200;
      return new MockResponse(mockObj, status);
    }
    if (resource.match(/document\/1\/generate/)) {
      mockObj = <T> new DocumentResponse("http://keros-api-dev.etic-insa.com/generated/87c8d206-e4d8-4c0c-973f-f067026b498b");
      status = 200;
      return new MockResponse(mockObj, status);
    }
    switch (resource) {
      case "ua/study/1":
        mockObj = <T> new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true, [new Document(1, "Hépar", true, false), new Document(2, "Vichy Célestins", false, true)]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study/2":
        mockObj = <T> new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false, [new Document(1, "Hépar", true, false), new Document(2, "Vichy Célestins", false, true)]);
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study":
        mockObj = <T> new Page(<T[]> [new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "TPE/PME")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], true, [new Document(1, "Hépar", true, false), new Document(2, "Vichy Célestins", false, true)]), new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], true, [new Document(1, "Hépar", true, false), new Document(2, "Vichy Célestins", false, true)])], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
      case "ua/study/me":
        mockObj = <T>new Page(
          [new Study(1, "Création de Keros:TEST", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "TPE/PME")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], true)
          , new Study(3, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "TPE/PME")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(4, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], true)],
          new Meta(0, 1, 4, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
  let mockObj: T[] | null = null;
  let status = 500;
  switch (resource) {
    case "ua/study":
      mockObj = <T[]> [<T> new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "TPE/PME")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))])];
      status = 200;
      return new MockResponse(mockObj, status);
  }
  return null;
}

// TODO implement when real options is used
options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
  return null;
}

update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
  let mockObj: T | null = null;
  let status = 500;
  switch (resource) {
    case "ua/study/1":
      mockObj = <T> new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]);
      status = 200;
      return new MockResponse(mockObj, status);
    case "ua/study/2":
      mockObj = <T> new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]);
      status = 200;
      return new MockResponse(mockObj, status);
    case "ua/study":
      mockObj = <T> new Page(<T[]> [new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "TPE/PME")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))]), new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))])], new Meta(0, 1, 2, 25));
      status = 200;
      return new MockResponse(mockObj, status);
  }
  return null;
}
}
