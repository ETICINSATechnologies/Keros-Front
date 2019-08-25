import { IMock } from "../IMock";
import { MockResponse } from "../MockClient";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Consultant } from "../../../../models/core/Consultant";
import { Page } from "../../../../models/core/Page";
import { Meta } from "../../../../models/core/Meta";
import * as winston from "winston";
import { Gender } from "../../../../models/core/Gender";
import { Department } from "../../../../models/core/Department";
import { Address } from "../../../../models/core/Address";
import { Country } from "../../../../models/core/Country";

export class ConsultantMock implements IMock {
    create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status = 500;
        switch (resource) {
            case "core/consultant":
                mockObj = <T>new Consultant(0, resources.lastName, resources.firstName, resources.username, new Gender(resources.genderId, "A"), resources.email, resources.birthday, new Department(resources.departmentId, "TC"), resources.schoolYear, resources.telephone, resources.address);
                status = 201;
                winston.debug("Consultant created : " + JSON.stringify(mockObj));
                return new MockResponse(mockObj, status);
        }
        return null;
    }

    del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
        let status = 500;
        switch (resource) {
            case "core/consultant/1":
                status = 204;
                winston.debug("Consultant 1 removed");
                return new MockResponse(null, status);
            case "core/consultant/2":
                status = 204;
                winston.debug("Consultant 2 removed");
                return new MockResponse(null, status);
        }
        return null;
    }

    get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status = 500;
        switch (resource) {
            case "core/consultant/me":
                mockObj = <T>new Consultant(1,
                    "Tommy",
                    "Dupont",
                    "tdupont",
                    new Gender(3, "A"),
                    "tom.dupont@test.com",
                    "1996-08-27",
                    new Department(1, "BIM"),
                    3,
                    "0607080910",
                    new Address(1,
                        "37, rue des Lilas",
                        "",
                        "01220",
                        "Grilly",
                        new Country(1, "France")),
                );
                status = 200;
                return new MockResponse(mockObj, status);
            case "core/consultant/1":
                mockObj = <T>new Consultant(1,
                    "Tom",
                    "Dupont",
                    "tdupont",
                    new Gender(3, "A"),
                    "tom.dupont@test.com",
                    "1996-08-27",
                    new Department(1, "BIM"),
                    3,
                    "0607080910",
                    new Address(1,
                        "37, rue des Lilas",
                        "",
                        "01220",
                        "Grilly",
                        new Country(1, "France")),
                );
                status = 200;
                return new MockResponse(mockObj, status);
            case "core/consultant/2":
                mockObj = <T>new Consultant(2,
                    "Pierre",
                    "Henry",
                    "tdupont",
                    new Gender(1, "H"),
                    "tom.dupont@test.com",
                    "1996-08-27",
                    new Department(9, "TC"),
                    3,
                    "0607080910",
                    new Address(2,
                        "1204, rue des Acacias",
                        "34, rue de Créqui",
                        "69006",
                        "Lyon",
                        new Country(2, "Suisse")),
                );
                status = 200;
                return new MockResponse(mockObj, status);
            case "core/consultant/3":
                mockObj = <T>new Consultant(3,
                    "Tom",
                    "Lidiot",
                    "tlidiot",
                    new Gender(3, "A"),
                    "tom.dupont@test.com",
                    "1996-08-27",
                    new Department(1, "BIM"),
                    3,
                    "0607080910",
                    new Address(1,
                        "37, rue des Lilas",
                        "",
                        "01220",
                        "Grilly",
                        new Country(1, "France")),
                );
                status = 200;
                return new MockResponse(mockObj, status);
            case "core/consultant":
                mockObj = <T>new Page(<T[]>[new Consultant(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France"))),
                        new Consultant(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "pierre.henry   @test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse"))),
                        new Consultant(3, "Tom", "Lidiot", "tlidiot", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")))
                    ],
                    new Meta(0, 2, 6, 25));
                status = 200;
                return new MockResponse(mockObj, status);
        }
        if (resource.startsWith("core/consultant?")) {
            mockObj = <T>new Page(<T[]>[new Consultant(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France"))),
                    new Consultant(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "pierre.henry   @test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse"))),
                    new Consultant(3, "Tom", "Lidiot", "tlidiot", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")))
                ],
                new Meta(0, 45, 1230, 25));
            status = 200;
            return new MockResponse(mockObj, status);
        }
        return null;
    }

    getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
        let mockObj: T[] | null = null;
        let status = 500;
        switch (resource) {
            case "core/consultant":
                mockObj = <T[]>[<T>new Consultant(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France"))),
                    new Consultant(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse"))),
                    new Consultant(3, "Tom", "Lidiot", "tlidiot", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France")))
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
        let mockObj: T | null = null;
        let status = 500;
        switch (resource) {
            case "core/consultant/1":
                mockObj = <T>new Consultant(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France"))),
                    new Consultant(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")));
                status = 200;
                return new MockResponse(mockObj, status);
            case "core/consultant/2":
                mockObj = <T>new Consultant(1, "Tom", "Dupont", "tdupont", new Gender(3, "A"), "tom.dupont@test.com", "1996-08-27", new Department(1, "BIM"), 3, "0607080910", new Address(1, "37, rue des Lilas", "", "01220", "Grilly", new Country(1, "France"))),
                    new Consultant(2, "Pierre", "Henry", "phenry", new Gender(1, "H"), "tom.dupont@test.com", "1996-08-27", new Department(9, "TC"), 3, "0607080910", new Address(2, "1204, rue des Acacias", "34, rue de Créqui", "69006", "Lyon", new Country(2, "Suisse")));
                status = 200;
                return new MockResponse(mockObj, status);
        }
        return null;
    }
}
