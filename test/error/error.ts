import { JSDOM } from "jsdom";
import jquery = require("jquery");
import { expect } from "chai";
import { request } from "../config";

describe("Error page testing", function () {
  it("Should return 404", function (done) {
    request
      .get("/doesntexist")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(404)
      .then(resp => {
        const window = new JSDOM(resp.text).window;
        const $ = jquery(window);
        expect($(".headline").text()).equals("404");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});