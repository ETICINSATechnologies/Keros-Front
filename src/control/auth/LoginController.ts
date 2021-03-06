import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { AuthService } from "../../services/auth/AuthService";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { MemberService } from "../../services/core/MemberService";
import { ConsultantService } from "../../services/core/ConsultantService";
import { Member } from "../../models/core/Member";
import * as httpContext from "express-http-context";
import { Config } from "../../config/Config";
import { Environment } from "../../config/Environment";

export class LoginController {

  /**
   * Display the login form to the user
   */
  public viewLoginForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting login form");
    res.render("auth/login");
  }

  /**
   * Try to authenticate the user with the given credentials
   */
  public login(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    const password = req.body.password;

    const request = new LoginRequest(username, password);
    AuthService.login(request, function (err: any, response: LoginResponse | null) {
      if (err) {
        if (err === 401) {
          const options = {
            error: 401,
          };
         res.status(401);
         res.render("auth/login", options);
        } else return next(err);
      }
      else {
        if (response === null) {
          return next(new Error("Connection échouée"));
        }

        const token = response.token;
        httpContext.set("token", token);
        winston.info("Getting connected user");
        MemberService.getConnectedMember(function (err: any, response: Member | null) {
          winston.debug("Getting connected member");
          if (err) {
            ConsultantService.getConnectedConsultant(function (err: any, response: Member | null) {
              if (err) {
                return next(err);
              }
              if (Config.getEnv().toString() === "testing") {
                res.redirect("/");
              } else {
                res.cookie("connectedUser", JSON.stringify(response))
                  .cookie("token", token)
                  .redirect("/");
              }
            // return next(err);
            });
          }
          else {
            if (Config.getEnv().toString() === "testing") {
              res.redirect("/");
            } else {
              res.cookie("connectedUser", JSON.stringify(response))
                .cookie("token", token)
                .redirect("/");
            }
          }
        });
      }
    });
  }
}
