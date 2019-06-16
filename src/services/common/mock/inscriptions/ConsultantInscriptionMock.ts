import { IMock } from "../IMock";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { ConsultantInscription } from "../../../../models/sg/ConsultantInscription";
import { MockResponse } from "../MockClient";
import { Department } from "../../../../models/core/Department";
import { Country } from "../../../../models/core/Country";
import { Document } from "../../../../models/Document";
import * as winston from "winston";
import { Address } from "../../../../models/core/Address";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import { DocumentResponse } from "../../../../models/DocumentResponse";
import { Gender } from "../../../../models/core/Gender";

export class ConsultantInscriptionMock implements IMock {
    create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status = 500;
        if (resource.match(/document/)) {
            status = 200;
            return new MockResponse(null, status);
        }
        switch (resource) {
            case "sg/consultant-inscription" :
                mockObj = <T> new ConsultantInscription(0, resources.firstName, resources.lastName, new Department(resources.departmentId, "TC"), resources.email, new Gender(resources.genderId, "H"), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), resources.socialSecurityNumber, resources.address, undefined, resources.droitImage);
                status = 201;
                return new MockResponse(mockObj, status);
        }
        return null;
    }
    update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status = 500;
        switch (resource) {
            case "sg/consultant-inscription/1" :
                mockObj = <T> new ConsultantInscription(1, resources.firstName, resources.lastName, new Department(resources.departmentId, "TC"), resources.email, new Gender(resources.genderId, "H"), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), resources.socialSecurityNumber, resources.address, undefined, resources.droitImage);
                status = 200;
                return new MockResponse(mockObj, status);
            case "sg/consultant-inscription/2" :
                mockObj = <T> new ConsultantInscription(2, resources.firstName, resources.lastName, new Department(resources.departmentId, "IF"), resources.email, new Gender(resources.genderId, "H"), resources.birthday, resources.phoneNumber, resources.outYear, new Country(resources.nationalityId, "France"), resources.socialSecurityNumber, resources.address, [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true
                ), new Document(4, "PDF quelconque", false, true)], resources.droitImage);
                status = 200;
                return new MockResponse(mockObj, status);

        }
        return null;
    }
    del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
        let status = 500;
        switch (resource) {
            case "sg/consultant-inscription/1" :
                status = 204;
                winston.debug("ConsultantInscription 1 removed");
                return new MockResponse(null, status);
            case "sg/consultant-inscription/2" :
                status = 204;
                winston.debug("ConsultantInscription 2 removed");
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
            case "sg/consultant-inscription/1" :
                mockObj = <T> new ConsultantInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com",  new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), "12345678901234567890", new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, false)], true);
                status = 200;
                return new MockResponse(mockObj, status);
            case "sg/consultant-inscription/2" :
                mockObj = <T> new ConsultantInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), "12345678901234567890", new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, true)], false);
                status = 200;
                return new MockResponse(mockObj, status);
            case "sg/consultant-inscription" :
                mockObj = <T> new Page(<T[]> [new ConsultantInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com", new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), "12345678901234567890", new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, false)], true),
                        new ConsultantInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), "12345678901234567890", new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, true)], false)],
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
            case "sg/consultant-inscription" :
                mockObj = <T[]> [new ConsultantInscription(1, "Michel", "Bienheureux", new Department(3, "GCU", "Génie Civil et Urbanisme"), "michel.bientavu@gmail.com", new Gender(1, "H"), "1996-08-27", "0676287201", 2021, new Country(1, "France"), "12345678901234567890", new Address(34, "40 Bd d'Elrond", undefined, "83800", "Foncombe", new Country(45, "Terre du Milieu")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, false)], true),
                    new ConsultantInscription(2, "Gandalf", "Leblanc", new Department(1, "TC", "Télécommunications"), "gandalf.leblanc@magicien.com", new Gender(1, "H"), "1997-05-12", "0823476212", 2023, new Country(3, "Maroc"), "12345678901234567890", new Address(12, "3 rue de Sauron", undefined, "69600", "Kazagdûm", new Country(46, "Mordor")), [new Document(1, "Fiche d'inscription", true, false), new Document(2, "Pièce identité", false, true), new Document(3, "Certificat de scolarité", false, true), new Document(4, "Relevé d'Identité Bancaire", false, true), new Document(5, "Titre de séjour", false, true)], false)];
                status = 200;
                return new MockResponse(mockObj, status);
        }
        return null;
    }
    options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
        return null;
    }
}
