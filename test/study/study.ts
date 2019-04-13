import { JSDOM } from "jsdom";
import { expect } from "chai";
import { defaultCookies, request } from "../helpers";
import { Response } from "supertest";
import jquery = require("jquery");

describe("Studies tests", function () {
  it("Should return the member list with /ua/study", function (done) {
    request
      .get("/ua/study")
      .set("Accept", "text/html")
      .set("Cookie", defaultCookies())
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
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Etude");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });

  it("Should return the creation form with /ua/study/create", function (done) {
    request
      .get("/ua/study/create")
      .set("Accept", "text/html")
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Nouvelle étude");
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
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fiche Etude");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});