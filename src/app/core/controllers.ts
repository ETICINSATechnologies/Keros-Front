import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";
import { Member, MemberRequest } from "./models";
import {
  MemberService,
  ConsultantService,
  DepartmentService,
  GenderService,
  CountryService,
  PositionService,
  PoleService
} from "./services";
import { formatTableData, formatFormFields } from "./helpers";

export class CoreController {
  static getDashboard(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting dashboard");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    res.render("core/dashboard", {
      route: req.originalUrl,
      connectedUser,
      isMember
    });
  }

  static async getProfilePage(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting profile page");

    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let viewed, entity, title;
    if (req.originalUrl.includes("/profile/me/")) {
      viewed = connectedUser;
      entity = isMember ? "members" : "consultants";
      title = "Mon Profil";
    } else if (connectedUser.id === parseInt(req.params.id)) {
      return res.redirect(`/profile/me/${req.params.action}`);
    } else if (["view", "modify"].includes(req.params.action)){
      const id = parseInt(req.params.id);
      title = `Profil Utilisateur #${id}`;
      entity = req.params.entity;
      switch (entity) {
        case "consultants":
          viewed = await ConsultantService.get(id);
          break;
        case "members":
        case "alumni":
          viewed = await MemberService.get(id);
          break;
        default:
          break;
      }
    } else {
      title = "Nouvel Utilisateur";
      entity = req.params.entity;
    }

    const departments = await DepartmentService.getAll();
    const genders = await GenderService.getAll();
    const countries = await CountryService.getAll();
    const positions = await PositionService.getAll();

    res.render("core/profile", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      viewed,
      title,
      entity,
      departments,
      genders,
      countries,
      positions,
      action: req.params.action
    });
  }

  static async modifyProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Modifying profile");

    let updatedUser;
    if (req.params.id) {
      const id = parseInt(req.params.id);
      const form = formatFormFields(req.body, req.params.entity);

      switch (req.params.entity) {
        case "consultants":
          updatedUser = await ConsultantService.update(id, form);
          break;
        case "members":
        case "alumni":
          updatedUser = await MemberService.update(id, form);
          break;
        default:
          break;
      }

      res.redirect(`/profile/${req.params.entity}/${req.params.id}/view`);
    } else {
      const connectedUser = JSON.parse(req.cookies.connectedUser);
      const isMember = req.cookies.isMember;
      if (isMember) {
        updatedUser = await MemberService.updateCurrent(formatFormFields(req.body, "members"));
      } else {
        updatedUser = await ConsultantService.updateCurrent(formatFormFields(req.body, "consultants"));
      }

      res
        .cookie("connectedUser", JSON.stringify(updatedUser))
        .redirect(`/profile/me/view`);
    }
  }

  static async addProfile(req: Request, res: Response, next: NextFunction) {
  }

  static async getSearchPage(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting search page for ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;
    let title, addRoute;

    switch (req.params.entity) {
      case "members":
        title = "Membres";
        addRoute = "/search/members/add";
        break;
      case "consultants":
        title = "Consultants";
        addRoute = "/search/consultants/add";
        break;
      case "alumni":
        title = "Anciens";
        break;
      default:
        break;
    }

    res.render("common/search", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      title,
      addRoute,
      enableExport: true
    });
  }

  static async getData(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting ${req.params.entity} data`);

    let response;
    switch (req.params.entity) {
      case "members":
      case "consultants":
      case "alumni":
        if (req.query) {
          const pageNumber = req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0;
          let queryRes;
          if (req.params.entity === "consultants") {
            queryRes = await ConsultantService.getAll({
              ...req.query,
              pageNumber
            });
          } else {
            queryRes = await MemberService.getAll({
              ...req.query,
              pageNumber,
              isAlumni: req.params.entity === "alumni"
            });
          }
          response = {
            data: formatTableData(queryRes.content, req.params.entity),
            itemsCount: queryRes.meta.totalItems
          };
        }
        break;
      case "positions":
        response = await PositionService.getAll();
        break;
      case "poles":
        response = await PoleService.getAll();
        break;
      case "departments":
        response = await DepartmentService.getAll();
        break;
      default:
        break;
    }

    res.json(response);
  }

  static async exportToCSV(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Exporting ${req.params.entity} as CSV file`);

    let csvPath;
    switch (req.params.entity) {
      case "consultants":
        csvPath = await ConsultantService.exportCSV(req.body.idList);
        break;
      case "members":
      case "alumni":
        csvPath = await MemberService.exportCSV(req.body.idList);
        break;
      default:
        break;
    }

    res.json(csvPath);
  }
}
