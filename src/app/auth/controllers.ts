import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";

import { MemberService, ConsultantService } from "../core/services";

import { AuthService } from "./services";
import { LoginRequest, LoginResponse } from "./models";

export class AuthController {
  static viewLoginPage(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting login page");
    res.render("auth/login", {
      route: req.originalUrl
    });
  }

  static login(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting authorization");
    AuthService.login({
      username: req.body.username,
      password: req.body.password
    }).then(async (lres: LoginResponse) => {
      const cMember = await MemberService.getCurrent().catch(
        (err: HttpError) => {
          if (err.status !== 404) {
            next(err);
          }
          return;
        }
      );
      const cConsultant = await ConsultantService.getCurrent().catch(
        (err: HttpError) => {
          if (err.status !== 404) {
            next(err);
          }
          return;
        }
      );
      const cUser = cMember || cConsultant;

      res
        .cookie("connectedUser", JSON.stringify(cUser))
        .cookie("token", lres.token)
        .cookie("isMember", Boolean(cMember))
        .redirect("/");
    }).catch((err: HttpError) => {
      if (err.status === 401) {
        res.status(err.status).render("auth/login", {
          unauthorized: true,
          route: req.originalUrl
        });
      } else {
        next(err);
      }
    });
  }

  static logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.clearCookie("connectedUser");
    res.clearCookie("isMember");
    res.redirect("/auth/login");
  }
}
