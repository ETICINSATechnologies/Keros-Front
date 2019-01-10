import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { StudyService } from "../../services/ua/StudyService";
import { Page } from "../../models/core/Page";
import { Study } from "../../models/ua/Study";
import * as httpContext from "express-http-context";

export class DashboardController {
  public getDashboard(req: Request, res: Response, next: NextFunction) {
    winston.debug("Getting dashboard");
    res.render("core/dashboard");
  }

  public viewStudiesOnDashboard(req: Request, res: Response, next: NextFunction) {
    StudyService.getAllStudiesForConnectedUser(function (err, page: Page<Study> | null) {
      winston.info("Getting all studies for connected user");
      if (err) {
        return next(err);
      }
      const options = {
        studies: page,
      };
      res.render("core/dashboardStudies",options);
    });
  }

}
