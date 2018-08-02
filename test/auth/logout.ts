import { expect } from "chai";
import { getCookie, request } from "../helpers";
import { Response } from "supertest";

describe("Logout tests", function () {
  it("Should logout the user and destroy token", function (done) {
    request
      .get("/auth/logout")
      .set("Accept", "text/html")
      .set('Cookie', 'token=randomToken;')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(302)
      .then((resp: Response) => {
        expect(getCookie(resp, "token")).is.null;
        expect(resp.header.location).equals("/auth/login");
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});