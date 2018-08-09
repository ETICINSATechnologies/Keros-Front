import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../helpers";
import { Response } from "supertest";
import jquery = require("jquery");

describe("Error page testing", function () {
  it("Logged out use should be redirected to login page", function (done) {
    request
      .get("/doesntexist")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(302)
      .expect("Location", "/auth/login")
      .then((resp: Response) => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("Logged in user should get 404 if page doesn't exist", function (done) {
    request
      .get("/doestnexist")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(404)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".headline").text()).equals("404");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});