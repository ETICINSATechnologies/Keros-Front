import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { MockResponse } from "../MockClient";
import * as winston from "winston";
import { Facture } from "../../../../models/treso/Facture";
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
import { FactureType } from "../../../../models/treso/FactureType";
import { FactureDocument } from "../../../../models/treso/FactureDocument";


export class FactureMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    if (resource.match(/treso\/facture\//)) {
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
      case "treso/facture":
        mockObj = <T> new Facture (0, resources["numero"], resources["fullAddress"], resources["clientName"], resources["contactName"], resources["contactEmail"], new Study(resources["studyId"]), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("acompte"), resources["amountDescription"], resources["subject"], resources["agreementSignDate"], resources["amountHT"], resources["taxPercentage"], 9000, resources["dueDate"], resources["additionalInformation"]);
        status = 201;
        winston.debug("Facture created : " + JSON.stringify(mockObj));
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let status: number = 500;
    switch (resource) {
      case "treso/facture/1":
        status = 204;
        winston.debug("Facture 1 removed");
        return new MockResponse(null, status);
      case "treso/facture/2":
        status = 204;
        winston.debug("Facture 2 removed");
        return new MockResponse(null, status);
    }
    return null;
  }

  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status: number = 500;
    if (resource.match(/generateDocument/)) {
      if (resource.match(/1/)) {
        mockObj = <T> new FactureDocument("http://keros-api-dev.etic-insa.com/api/v1/core/document/a946092b-7387-4f42-bcd0-d4e43ccab89e");
        status = 200;
        return new MockResponse(mockObj, status);
      }
    }
    switch (resource) {
      case "treso/facture/1":
        mockObj = <T> new Facture(1, "numero1", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "La Ferme à Dédé", "Jean Aimmare", "jeanaimarre@lafeermeadede.fr", new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "réalisation du plus bel ERP jamais conçu", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/facture/2":
        mockObj = <T> new Facture(2, "numero1", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "Gogle", "Claire Ment", "clairement@gogle.com", new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "création d'une billeterie en ligne", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/facture":
        mockObj = <T> new Page(<T[]> [new Facture(1, "numero1", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "La Ferme à Dédé", "Jean Aimmare", "jeanaimarre@lafeermeadede.fr", new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "réalisation du plus bel ERP jamais conçu", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"))), new Facture(2, "numero1", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "Gogle", "Claire Ment", "clairement@gogle.com", new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "création d'une billeterie en ligne", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")))], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "treso/facture":
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
    let status: number = 500;
    switch (resource) {
      case "treso/facture/1":
        mockObj = <T> new Facture(1, "numero1", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "La Ferme à Dédé", "Jean Aimmare", "jeanaimarre@lafeermeadede.fr", new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "réalisation du plus bel ERP jamais conçu", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/facture/2":
        mockObj = <T> new Facture(2, "numero1", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "Gogle", "Claire Ment", "clairement@gogle.com", new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "création d'une billeterie en ligne", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")));
        status = 200;
        return new MockResponse(mockObj, status);
      case "treso/facture":
        mockObj = <T> new Page(<T[]> [new Facture(1, "numero1", new Address(1, "13 rue des Canards", "appt 312", "Tourcoing", "59600", new Country(5, "France")), "La Ferme à Dédé", "Jean Aimmare", "jeanaimarre@lafeermeadede.fr", new Study(1, 1234, "Création de Keros", "Le site web est un ERP", new Field(2, "Web"), new Status(1, "En cours"), new Provenance(4, "Phoning"), "2018-08-27", "2019-01-01", 5000, 2000, 1000, 200, 0, "", new Firm(1, "99999999", "La boucherie du Léman", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")), new FirmType(2, "PME/TPE")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined,  "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))],  true), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "réalisation du plus bel ERP jamais conçu", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), true, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"))), new Facture(2, "numero1", new Address(2, "2 rue des Palourdes", "appt 65", "Villeurbanne", "69100", new Country(5, "France")), "Gogle", "Claire Ment", "clairement@gogle.com", new Study(2, 6789, "Création d'une billeterie", "Le site web est une billeterie en ligne pour le concert de Iz", new Field(3, "Réseau"), new Status(4, "Finie"), new Provenance(1, "Mail"), "2018-02-27", "2018-09-01", 20, 1000, 100, 500, 200, "2018-10-05", new Firm(2, "1111111", "La poissonerie des familles", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")), new FirmType(4, "SARL")), [new Contact(1, "Jimmy", "Neutron", new Gender(3, "A"), undefined, "jimmy@test.com", "0450202122", "+33620547064", "Stagiaire"), new Contact(2, "José", "Bové", new Gender(4, "I"), undefined, "votezjosé@test.com", "0405060708", "+33711121314", "PDG")], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], [new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H"))], false), new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")), new FactureType("proforma"), "D’un montant de quatre mille quatre-vingt euros toutes taxes comprises (4080€ TTC), correspondant à la réalisation de 13 JEH", "création d'une billeterie en ligne", "2018-08-27", 15000, 20, 65101, "2019-09-25", "Parce que c'est notre projet ! (Keros bien sûr)", "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(2, "Pierre", "Henry", "phenry", new Gender(1, "H")), false, "2019-03-08", new Member(1, "Tom", "Dupont", "tdupont", new Gender(3, "A")))], new Meta(0, 1, 2, 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
}