import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { AuthService } from "../../services/auth/AuthService";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { ForgetPasswordRequest } from "../../models/auth/ForgetPasswordRequest";
import { MemberService } from "../../services/core/MemberService";
import { ConsultantService } from "../../services/core/ConsultantService";
import { Member } from "../../models/core/Member";
import * as httpContext from "express-http-context";
import { Config } from "../../config/Config";
import { ResetPasswordRequest } from "../../models/auth/ResetPasswordRequest";


export class LoginController {

  /**
   * Display the login form to the user
   */
  public viewLoginForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting login form");
    res.render("auth/login");
  }
  /**
   * Display the forget password page to the user
   */
  public viewForgetPassword(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting forget password page");
    res.render("auth/forgetPassword");
  }
  /**
   * Display the reset password page to the user
   */
  public viewResetPassword(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting reset password page");
    winston.debug(req.query.token);
    const options = {
      token: req.query.token,
    }
    res.render("auth/resetPassword", options);
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
        MemberService.getConnectedMember(function (err: any, response: Member | null) {
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

  /**
   * Try to send to the back forgetPassword request
   */
  public forgetPassword(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const request = new ForgetPasswordRequest(email);
    AuthService.forgetPassword(request, function (err: any) {
      if (err) {
        return next(err);
      } else {
        const options = {
          recu: true,
        }
        res.render("auth/forgetPassword", options);
      }
    });
  }

  /**
   * Try to send to the back forgetPassword request
   */
  public resetPassword(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    const token = req.query.token;
    const request = new ResetPasswordRequest(password, token);
    AuthService.resetPassword(request, function (err: any) {
      if (err) {
        return next(err);
      } else {
        res.render("auth/login");
      }
    });
  }
}
