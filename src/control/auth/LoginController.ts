import {NextFunction, Request, Response} from "express";
import * as winston from "winston";
import {AuthService} from "../../services/auth/AuthService";
import {LoginRequest} from "../../models/auth/LoginRequest";
import {LoginResponse} from "../../models/auth/LoginResponse";
import {MemberService} from "../../services/core/MemberService";
import {Member} from "../../models/core/Member";
import * as httpContext from "express-http-context";
import {Config} from "../../config/Config";
import {Environment} from "../../config/Environment";

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
    let username = req.body.username;
    let password = req.body.password;
    let request = new LoginRequest(username, password);
    AuthService.login(request, function (err: any, response: LoginResponse | null) {
      if (err) {
        return next(err);
      }
      if (response === null) {
        return next(new Error("Connection échouée"));
      }
      let token = response.token;
      httpContext.set("token", token);
      MemberService.getConnectedMember(function (err: any, response: Member | null) {
        if (err) {
          return next(err);
        }

        if(Config.getEnv().toString() === "testing"){
          res.redirect("/");
        } else {
          res.cookie("connectedUser", JSON.stringify(response))
            .cookie("token", token)
            .redirect("/");
        }
      });
    });
  }
}
