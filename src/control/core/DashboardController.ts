import { NextFunction, Request, Response } from "express";
import * as winston from "winston";

export class DashboardController {
  public getDashboard(req: Request, res: Response, next: NextFunction) {
    winston.debug("Getting dashboard");
    res.render("core/dashboard");
  }
}
