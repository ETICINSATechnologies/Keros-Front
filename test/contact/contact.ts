import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import jquery = require("jquery");
import { Response } from "supertest";

describe("Contact tests", function () {
  it("Should return the member list with /ua/contact", function (done) {
    request
      .get("/ua/contact")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Voir les contacts");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
  it("Should return a specific contact view with /ua/contact/id", function (done) {
    request
      .get("/ua/contact/1")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Contact");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
  it("Should return the creation form with /ua/contact/create", function (done) {
    request
      .get("/ua/contact/create")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Nouveau contact");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
  it("Should return the update form with /ua/contact/update/id", function (done) {
    request
      .get("/ua/contact/update/1")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Contact");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});