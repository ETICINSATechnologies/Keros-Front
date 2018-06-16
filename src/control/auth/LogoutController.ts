import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { AuthService } from "../../services/auth/AuthService";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";

export class LogoutController {

  /**
   * Logs out the user by destroying the authentication token
   */
  public logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.redirect("/auth/login")
  }
}