import { JSDOM } from "jsdom";
import { expect } from "chai";
import { request } from "../config";
import jquery = require("jquery");

describe("Cat tests", function () {
  it("Should return the cat list with /cat", function (done) {
    request
      .get("/cat")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then(resp => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".content-header>h1:first").text().trim()).equals("Voir les chats");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});