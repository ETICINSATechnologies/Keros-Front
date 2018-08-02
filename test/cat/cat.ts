import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import jquery = require("jquery");
import { Response } from "supertest";

describe("Cat tests", function () {
  it("Should return the cat list with /cat", function (done) {
    request
      .get("/cat")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Voir les chats");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });

  it("Should be redirected to login page if no token is present", function (done) {
    request
      .get("/cat")
      .set("Accept", "text/html")
      .set('Cookie', '')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(302)
      .then((resp: Response) => {
        expect(resp.header.location).equals("/auth/login");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});