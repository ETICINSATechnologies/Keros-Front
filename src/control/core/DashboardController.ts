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
    StudyService.getOnGoingStudiesForConnectedUser(function (err, page: Page<Study> | null, nbStudies: number) {
      if (err) {
        return next(err);
      }
      const options = {
        studies: page,
        nbOngoingStudies : nbStudies,
      };
      res.render("core/dashboard", options);
    });
  }

  public paymentSuccesful(req: Request, res: Response, next: NextFunction) {
    res.render("core/paymentSuccessful");
  }

  public paymentCancelled(req: Request, res: Response, next: NextFunction) {
    res.render("core/paymentCancelled");
  }

}
