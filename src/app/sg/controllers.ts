import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";

import { DepartmentService, GenderService, CountryService, PoleService } from "../core/services";

import { MemberRegistrationService, ConsultantRegistrationService } from "./services";
import { deserializeTableData } from "./helpers";

export class SecretaryController {
  static async getSearchPage(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting search page for ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;
    let title, addRoute;

    switch (req.params.entity) {
      case "members":
        title = "Inscriptions Membres";
        addRoute = "/sg/registrations/members/add";
        break;
      case "consultants":
        title = "Inscriptions Consultants";
        addRoute = "/sg/registrations/consultants/add";
        break;
      default:
        break;
    }

    res.render("common/search", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      title,
      addRoute
    });
  }

  static async getData(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting registrations of ${req.params.entity}`);

    let queryRes;
    switch (req.params.entity) {
      case "consultants":
        queryRes = await ConsultantRegistrationService.getAll({
          ...req.query,
          pageNumber: req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0
        });
        res.json({
          data: deserializeTableData(queryRes.content, req.params.entity),
          itemsCount: queryRes.meta.totalItems
        });
        break;
      case "members":
        queryRes = await MemberRegistrationService.getAll({
          ...req.query,
          pageNumber: req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0
        });
        res.json({
          data: deserializeTableData(queryRes.content, req.params.entity),
          itemsCount: queryRes.meta.totalItems
        });
        break;
      default:
        break;
    }
  }

  static async getRegistration(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting registration ID ${req.params.id} of ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let viewed;
    switch (req.params.entity) {
      case "consultants":
        viewed = await ConsultantRegistrationService.get(req.params.id);
        break;
      case "members":
        viewed = await MemberRegistrationService.get(req.params.id);
        break;
      default:
        break;
    }

    const departments = await DepartmentService.getAll();
    const genders = await GenderService.getAll();
    const countries = await CountryService.getAll();
    const poles = await PoleService.getAll();

    res.render("sg/registration", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      viewed,
      departments,
      genders,
      countries,
      poles,
      entity: req.params.entity,
      modify: false
    });
  }
}
