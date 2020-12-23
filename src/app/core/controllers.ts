import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";
import {
  MemberService,
  ConsultantService,
  DepartmentService,
  GenderService,
  CountryService,
  PositionService,
  PoleService
} from "./services";
import { MemberRequest, ConsultantRequest } from "./models";
import { formatTableData, formatFormFields } from "./helpers";

export class CoreController {
  static getDashboard(req: Request, res: Response, _next: NextFunction): void {
    winston.verbose("Getting dashboard");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    res.render("core/dashboard", {
      route: req.originalUrl,
      connectedUser,
      isMember
    });
  }

  static async getProfilePage(req: Request, res: Response, next: NextFunction): Promise<void> {
    winston.verbose("Getting profile page");

    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let viewed;
    let entity;
    let title;
    let action;
    let deleteRoute;
    if (req.originalUrl.includes("/profile/me/")) {
      viewed = connectedUser;
      entity = isMember ? "members" : "consultants";
      title = "Mon Profil";
      action = req.params.action;
    } else if (connectedUser.id === parseInt(req.params.id, 10)) {
      return res.redirect(`/profile/me/${req.params.action}`);
    } else if (["view", "modify"].includes(req.params.action)) {
      const id = parseInt(req.params.id, 10);
      title = `Profil Utilisateur #${id}`;
      entity = req.params.entity;
      action = req.params.action;
      deleteRoute = `/profile/${entity}/${id}/delete`;
      switch (entity) {
        case "consultants":
          viewed = await ConsultantService.getProtected(id).catch((err: HttpError) => {
            next(err);
            return;
          });
          break;
        case "members":
        case "alumni":
          viewed = await MemberService.get(id).catch(err => next(err));
          break;
        default:
          break;
      }
    } else {
      title = "Nouvel Utilisateur";
      entity = req.params.entity;
      action = "add";
    }

    const departments = await DepartmentService.getAll().catch(err => next(err));
    const genders = await GenderService.getAll().catch(err => next(err));
    const countries = await CountryService.getAll().catch(err => next(err));
    const positions = await PositionService.getAll().catch(err => next(err));

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
      action,
      deleteRoute
    });
  }

  static async modifyProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    winston.verbose("Modifying profile");

    if (req.params.id) {
      const id = parseInt(req.params.id, 10);
      const form = formatFormFields(req.body, req.params.entity);

      let updatedUser;
      let entity = req.params.entity;
      switch (entity) {
        case "consultants": {
          const cForm = form as ConsultantRequest;
          updatedUser = await ConsultantService.update(id, cForm).catch(err => next(err));
          break;
        }
        case "members":
        case "alumni": {
          const mForm = form as MemberRequest;
          updatedUser = await MemberService.update(id, mForm).catch(err => next(err));
          // handles redirection when alumni status toggled
          entity = updatedUser && updatedUser.isAlumni ? "alumni" : "members";
          break;
        }
        default:
          break;
      }

      res.redirect(`/profile/${entity}/${req.params.id}/view`);
    } else {
      const isMember = req.cookies.isMember;

      const updatedUser = isMember ?
        await MemberService.updateCurrent(formatFormFields(req.body, "members") as MemberRequest) :
        await ConsultantService.updateCurrent(formatFormFields(req.body, "consultants") as ConsultantRequest);

      res
        .cookie("connectedUser", JSON.stringify(updatedUser))
        .redirect("/profile/me/view");
    }
  }

  static async addProfile(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose("Adding new user");

    const form = formatFormFields(req.body, req.params.entity);

    let newUser;
    switch (req.params.entity) {
      case "consultants": {
        const cForm = form as ConsultantRequest;
        newUser = await ConsultantService.create(cForm);
        res.redirect(`/profile/consultants/${newUser.id}/view`);
        break;
      }
      case "members": {
        const mForm = form as MemberRequest;
        newUser = await MemberService.create(mForm);
        res.redirect(`/profile/members/${newUser.id}/view`);
        break;
      }
      default:
        break;
    }
  }

  static async deleteProfile(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Deleting user with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);

    switch (req.params.entity) {
      case "consultants":
        await ConsultantService.delete(id);
        break;
      case "members":
      case "alumni":
        await MemberService.delete(id);
        break;
      default:
        break;
    }

    res.redirect(`/search/${req.params.entity}`);
  }

  static async getSearchPage(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Getting search page for ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let title;
    let addRoute;
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

  static async getData(req: Request, res: Response, _next: NextFunction): Promise<void> {
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

  static async exportToCSV(req: Request, res: Response, _next: NextFunction): Promise<void> {
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
