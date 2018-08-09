import { NextFunction, Request, Response } from "express";

export class LogoutController {

  /**
   * Logs out the user by destroying the authentication token
   */
  public logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.redirect("/auth/login");
  }
}