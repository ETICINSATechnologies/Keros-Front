import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import jquery = require("jquery");
import { Response } from "supertest";

describe("Firm tests", function () {
    it("Should return the firm list with /ua/firm", function (done) {
        request
            .get("/ua/firm")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Voir les sociétés");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return a specific firm view with /ua/firm/id", function (done) {
        request
            .get("/ua/firm/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Voir les sociétés");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the creation form with /ua/firm/inscription", function (done) {
        request
            .get("/ua/firm/inscription")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Création d'une société");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the update form with /ua/firm/update/id", function (done) {
        request
            .get("/ua/firm/update/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Modification d'une société");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });
});