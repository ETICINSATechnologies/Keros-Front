import { defaultCookies, request } from "../helpers";
import { Response } from "supertest";

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
      .set("Cookie", defaultCookies())
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(404)
      .then((resp: Response) => {
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});
