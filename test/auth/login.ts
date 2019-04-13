import { JSDOM } from "jsdom";
import { expect } from "chai";
import { getCookie, request } from "../helpers";
import { Response } from "supertest";
import jquery = require("jquery");

describe("Login tests", function () {
  it("Should return the login page", function (done) {
    request
      .get("/auth/login")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((resp: Response) => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($("input[name='wronginput']").length).equals(0);
        expect($("input[name='username']").length).equals(1);
        expect($("input[name='password']").length).equals(1);
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });

  it("Should accept good login credentials", function (done) {
    request
      .post("/auth/login")
      .send({
        username: "username",
        password: "password"
      })
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(302)
      .then((resp: Response) => {
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });

  it("Should refuse bad login credentials", function (done) {
    request
      .post("/auth/login")
      .send({
        username: "random",
        password: "notgoodpass"
      })
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(401)
      .then((resp: Response) => {
        expect(getCookie(resp, "token")).is.null;
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });

});
