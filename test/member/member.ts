import { JSDOM } from "jsdom";
import { expect } from "chai";
import { defaultCookies, request } from "../helpers";
import { Response } from "supertest";
import jquery = require("jquery");

describe("Member tests", function () {
  it("Should return the member list with /core/member", function (done) {
    request
      .get("/core/member")
      .set("Accept", "text/html")
      .set("Cookie", defaultCookies())
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
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Membre");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
  it("Should return the creation form with /core/member/signin", function (done) {
    request
      .get("/core/member/create")
      .set("Accept", "text/html")
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Nouveau Membre");
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
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Membre");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
  it("Should return the update form for the connected user with /core/member/me", function (done) {
    request
      .get("/core/member/me")
      .set("Accept", "text/html")
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Mon Profil");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});
