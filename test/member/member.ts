import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import jquery = require("jquery");
import { Response } from "supertest";

describe("Member tests", function () {
    it("Should return the member list with /core/member", function (done) {
        request
            .get("/core/member")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Voir les membres");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return a specific member view with /core/member/id", function (done) {
        request
            .get("/core/member/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
            const window = new JSDOM(resp.text).window;
            const $ = jquery(window);
            expect($(".content-header>h1:first").text().trim()).equals("Voir les membres");
            done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the creation form with /core/member/inscription", function (done) {
        request
            .get("/core/member/inscription")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Page d'inscription");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });

    it("Should return the update form with /core/member/update/id", function (done) {
        request
            .get("/core/member/update/1")
            .set("Accept", "text/html")
            .set('Cookie', 'token=randomToken;')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .then((resp: Response) => {
                const window = new JSDOM(resp.text).window;
                const $ = jquery(window);
                expect($(".content-header>h1:first").text().trim()).equals("Modification d'un membre");
                done();
            })
            .catch((err: Error) => {
                done(err);
            });
    });
});