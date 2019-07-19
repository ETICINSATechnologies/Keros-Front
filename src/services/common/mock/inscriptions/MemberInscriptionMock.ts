import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { MemberInscription } from "../../../../models/sg/MemberInscription";
import { MockResponse } from "../MockClient";
import { Department } from "../../../../models/core/Department";
import { Pole } from "../../../../models/core/Pole";
import { Country } from "../../../../models/core/Country";
import { Document } from "../../../../models/Document";
import * as winston from "winston";
import { Address } from "../../../../models/core/Address";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import { DocumentResponse } from "../../../../models/DocumentResponse";
import { Gender } from "../../../../models/core/Gender";

export class MemberInscriptionMock implements IMock {
  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    if (resource.match(/document/)) {
      status = 200;
      return new MockResponse(null, status);
    }
    switch (resource) {
      case "sg/membre-inscription" :
        mockObj = <T> new MemberInscription(0, resources.firstName, resources.lastName, new Department(resources.departmentId, "TC"), resources.email, new Gender(resources.genderId), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), new Pole(resources.wantedPoleId, "SI", "Systèmes d'Informations"), resources.address, undefined, resources.hasPaid, resources.droitImage);
        status = 201;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    switch (resource) {
      case "sg/membre-inscription/1" :
        mockObj = <T> new MemberInscription(1, resources.firstName, resources.lastName, new Department(resources.departmentId, "TC"), resources.email, new Gender(resources.genderId), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), new Pole(resources.wantedPoleId, "SI", "Systèmes d'Informations"), resources.address, undefined, resources.hasPaid, resources.droitImage);
        status = 200;
        return new MockResponse(mockObj, status);
      case "sg/membre-inscription/2" :
        mockObj = <T> new MemberInscription(2, resources.firstName, resources.lastName, new Department(resources.departmentId, "IF"), resources.email, new Gender(resources.genderId), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), new Pole(resources.wantedPoleId, "SI", "Systèmes d'Informations"), resources.address, [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, false), new Document(4, "PDF quelconque", false, true)], resources.hasPaid, resources.droitImage);
        status = 200;
        return new MockResponse(mockObj, status);

    }
    return null;
  }
  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let status = 500;
    switch (resource) {
      case "sg/membre-inscription/1" :
        status = 204;
        winston.debug("MemberInscription 1 removed");
        return new MockResponse(null, status);
      case "sg/membre-inscription/2" :
        status = 204;
        winston.debug("MemberInscription 2 removed");
        return new MockResponse(null, status);
    }
    return null;
  }
  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
    let mockObj: T | null = null;
    let status = 500;
    if (resource.match(/document\/3/)) {
      if (resource.match(/inscription\/2/)) {
        mockObj = <T> new DocumentResponse("http://keros-api-dev.etic-insa.com/generated/87c8d206-e4d8-4c0c-973f-f067026b498b");
        status = 200;
        return new MockResponse(mockObj, status);
      }
    }
    if (resource.match(/document\/1\/generate/)) {
      mockObj = <T> new DocumentResponse("http://keros-api-dev.etic-insa.com/generated/87c8d206-e4d8-4c0c-973f-f067026b498b");
      status = 200;
      return new MockResponse(mockObj, status);
    }
    switch (resource) {
      case "sg/membre-inscription/1" :
        mockObj = <T> new MemberInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com", new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), new Pole(2, "UA", "Unité d'affaires"), new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), undefined, true, true);
        status = 200;
        return new MockResponse(mockObj, status);
      case "sg/membre-inscription/2" :
        mockObj = <T> new MemberInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), new Pole(1, "SI", "Systèmes d'informations"), new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, false), new Document(3, "PDF quelconque", false, true)], false, false);
        status = 200;
        return new MockResponse(mockObj, status);
      case "sg/membre-inscription" :
        mockObj = <T> new Page(<T[]> [new MemberInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com", new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), new Pole(2, "UA", "Unité d'affaires"), new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), undefined, true, true),
          new MemberInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), new Pole(1, "SI", "Systèmes d'informations"), new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, false), new Document(3, "PDF quelconque", false, true)], false, false)],
          new Meta(0, 1, 2 , 25));
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
    let mockObj: T[] | null = null;
    let status = 500;
    switch (resource) {
      case "sg/membre-inscription" :
        mockObj = <T[]> [new MemberInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com", new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), new Pole(2, "UA", "Unité d'affaires"), new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), undefined, true, true),
          new MemberInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), new Pole(1, "SI", "Systèmes d'informations"), new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, false), new Document(4, "PDF quelconque", false, true)], false, false)];
        status = 200;
        return new MockResponse(mockObj, status);
    }
    return null;
  }
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
    return null;
  }
}
