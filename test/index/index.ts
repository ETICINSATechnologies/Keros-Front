import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../config";
import jquery = require("jquery");

describe("Index tests", function () {
  it("Should return the index with /index", function (done) {
    request
      .get("/index")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then(resp => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fixed Layout");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("Should return the index with /", function (done) {
    request
      .get("/")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then(resp => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Fixed Layout");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});