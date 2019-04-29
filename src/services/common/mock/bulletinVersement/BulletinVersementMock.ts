import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { MockResponse } from "../MockClient";
import * as winston from "winston";
import { Address } from "../../../../models/core/Address";
import { Country } from "../../../../models/core/Country";
import { Study } from "../../../../models/ua/Study";
import { Field } from "../../../../models/ua/Field";
import { Status } from "../../../../models/ua/Status";
import { Provenance } from "../../../../models/ua/Provenance";
import { Firm } from "../../../../models/ua/Firm";
import { FirmType } from "../../../../models/ua/FirmType";
import { Contact } from "../../../../models/ua/Contact";
import { Gender } from "../../../../models/core/Gender";
import { Member } from "../../../../models/core/Member";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import { BulletinVersement } from "../../../../models/treso/BulletinVersement";
import { DocumentResponse } from "../../../../models/DocumentResponse";


export class BulletinVersementMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    if (resource.match(/treso\/payment-slip\//)) {
      if (resource.match(/validate-ua/)) {
        if (resource.match(/2/)) {
          status = 200;
          return new MockResponse(mockObj, status);
        }
        return new MockResponse(mockObj, status);
      }
      if (resource.match(/validate-perf/)) {
        if (resource.match(/2/)) {
          status = 200;
          return new MockResponse(mockObj, status);
        }
        return new MockResponse(mockObj, status);
      }
    }
    switch (resource) {
      case "treso/payment-slip":
        mockObj = <T> new BulletinVersement (0, resources.missionRecapNumber, resources.consultantId, resources.consultantName,  resources.consultantSocialSecurityNumber, resources.address, resources.email, new Study(), resources.clientName, resources.projectLead, resources.isTotalJEH, resources.isStudyPaid, resources.amountDescription, "2019-03-15", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), false, undefined, undefined, false, undefined, undefined);
        status = 201;
        winston.debug("BulletinVersement created with : " + JSON.stringify(resources));
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let status = 500;
    switch (resource) {
      case "treso/payment-slip/1":
        status = 204;
        winston.debug("BulletinVersement 1 removed");
        return new MockResponse(null, status);
      case "treso/payment-slip/2":
        status = 204;
        winston.debug("BulletinVersement 2 removed");
        return new MockResponse(null, status);
    }
    return null;
  }

  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    if (resource.match(/generateDocument/)) {
      if (resource.match(/1/)) {
        mockObj = <T> new DocumentResponse("http://keros-api-dev.etic-insa.com/api/v1/core/document/a946092b-7387-4f42-bcd0-d4e43ccab89e");
        status = 200;
        return new MockResponse(mockObj, status);
      }
    }
    switch (resource) {
      case "treso/payment-slip/1":
        mockObj = <T> new BulletinVersement(1, "00001", 3, "Jean Foirfouille", "11251205428", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "jeanfoirfouille@laposte.net", new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/payment-slip/2":
        mockObj = <T> new BulletinVersement(2, "00002", 5, "Anne Trôtre", "1259905428", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "annetrotro@vouslavez.com", new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), "La poissonerie des familles", "Tom Dupont", true, true, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Jacques", "pjacques", new Gender(1, "H")), false, undefined, undefined, false, undefined, undefined);
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/payment-slip":
        mockObj = <T> new Page(<T[]> [new BulletinVersement(1, "00001", 3, "Jean Foirfouille", "11251205428", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "jeanfoirfouille@laposte.net", new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"))), new BulletinVersement(2, "00002", 5, "Anne Trôtre", "1259905428", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "annetrotro@vouslavez.com", new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Jacques", "pjacques", new Gender(1, "H")), false, undefined, undefined, false, undefined, undefined)], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "treso/payment-slip":
        mockObj = null;
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
      case "treso/payment-slip/1":
        mockObj = <T> new BulletinVersement(1, "00001", 3, "Jean Foirfouille", "11251205428", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "jeanfoirfouille@laposte.net", new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/payment-slip/2":
        mockObj = <T> new BulletinVersement(2, "00002", 5, "Anne Trôtre", "1259905428", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "annetrotro@vouslavez.com", new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Jacques", "pjacques", new Gender(1, "H")), false, undefined, undefined, false, undefined, undefined);
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/payment-slip":
        mockObj = <T> new Page(<T[]> [new BulletinVersement(1, "00001", 3, "Jean Foirfouille", "11251205428", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "jeanfoirfouille@laposte.net", new Study(2, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"))), new BulletinVersement(2, "00002", 5, "Anne Trôtre", "1259905428", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "annetrotro@vouslavez.com", new Study(1, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), "La poissonerie des familles", "Tom Dupont", true, false, "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "2019-03-15", new Member(2, "Pierre", "Jacques", "pjacques", new Gender(1, "H")), false, undefined, undefined, false, undefined, undefined)], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
}
