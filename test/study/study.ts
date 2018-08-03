import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import jquery = require("jquery");
import { Response } from "supertest";

describe("Studies tests", function () {
    it("Should return the member list with /ua/study", function (done) {
        request
            .get("/ua/study")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Voir les études");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return a specific member view with /ua/study/id", function (done) {
        request
            .get("/ua/study/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Voir les études");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the creation form with /ua/study/inscription", function (done) {
        request
            .get("/ua/study/inscription")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Création d'une étude");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the update form with /ua/study/update/id", function (done) {
        request
            .get("/ua/study/update/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Modification d'une étude");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });
});