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
import { deserializeTableData } from "./helpers";

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

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let viewedUser;
    if (!req.params.id) {
      viewedUser = connectedUser;
    } else if (connectedUser.id === parseInt(req.params.id)) {
      return res.redirect(`/profile/me`);
    } else {
      const id = parseInt(req.params.id);
      switch (req.params.entity) {
        case "consultants":
          viewedUser = await ConsultantService.get(id);
          break;
        default:
          viewedUser = await MemberService.get(id);
          break;
      }
    }

    const departments = await DepartmentService.getAll();
    const genders = await GenderService.getAll();
    const countries = await CountryService.getAll();
    const positions = await PositionService.getAll();

    res.render("core/profile", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      viewedUser,
      entity: req.params.entity,
      departments,
      genders,
      countries,
      positions,
      modify: false
    });
  }

  static async enableModifyProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Enabling modification on profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let viewedUser;
    if (req.originalUrl === "/profile/me/modify") {
      viewedUser = connectedUser;
    } else if (connectedUser.id === parseInt(req.params.id)) {
      return res.redirect(`/profile/${req.params.entity}/me`);
    } else {
      const id = parseInt(req.params.id);
      switch (req.params.entity) {
        case "consultants":
          viewedUser = await ConsultantService.get(id);
          break;
        default:
          viewedUser = await MemberService.get(id);
          break;
      }
    }

    const departments = await DepartmentService.getAll();
    const genders = await GenderService.getAll();
    const countries = await CountryService.getAll();
    const positions = await PositionService.getAll();

    res.render("core/profile", {
      route: req.originalUrl,
      connectedUser,
      isMember,
      viewedUser,
      entity: req.params.entity,
      departments,
      genders,
      countries,
      positions,
      modify: true
    });
  }

  static async modifyCurrentProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Modifying connected profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    if (!req.body.password) {
      delete req.body.password;
    }

    delete req.body.id;
    const address = {
      ...req.body.address,
      postalCode: parseInt(req.body.address.postalCode),
      countryId: parseInt(req.body.address.countryId)
    };

    if (isMember) {
      const positions = [];
      for (const position of req.body.positions) {
        const updatedPosition = {
          id: parseInt(position.id),
          poleId: parseInt(position.poleId),
          year: parseInt(position.year),
          isBoard: Boolean(position.isBoard)
        };
        positions.push(updatedPosition);
      }
      const updatedUser = await MemberService.updateCurrent({
        ...req.body,
        genderId: parseInt(req.body.genderId),
        departmentId: parseInt(req.body.departmentId),
        schoolYear: parseInt(req.body.schoolYear),
        address,
        positions
      });
      res.cookie("connectedUser", JSON.stringify(updatedUser));
    }
    res.redirect(`/profile/me`);
  }

  static async modifyProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Modifying profile");

    if (!req.body.password) {
      delete req.body.password;
    }

    const address = {
      ...req.body.address,
      postalCode: parseInt(req.body.address.postalCode),
      countryId: parseInt(req.body.address.countryId)
    };

    switch (req.params.entity) {
      case "consultants":
        break;
      default:
        const positions = [];
        for (const position of req.body.positions) {
          const updatedPosition = {
            id: parseInt(position.id),
            poleId: parseInt(position.poleId),
            year: parseInt(position.year),
            isBoard: Boolean(position.isBoard)
          };
          positions.push(updatedPosition);
        }
        const updatedUser = await MemberService.update(
          parseInt(req.params.id),
          {
            ...req.body,
            genderId: parseInt(req.body.genderId),
            departmentId: parseInt(req.body.departmentId),
            schoolYear: parseInt(req.body.schoolYear),
            address,
            positions
          }
        );
        break;
    }
    res.redirect(`/profile/${req.params.entity}/${req.params.id}`);
  }

  static async getSearchPage(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting search page for ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;
    let title, addRoute, exportRoute;

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
      exportRoute
    });
  }

  static async getData(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting ${req.params.entity} data`);

    switch (req.params.entity) {
      case "members":
        if (req.query) {
          const queryRes = await MemberService.getAll({
            ...req.query,
            pageNumber: req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0,
            isAlumni: false
          });
          res.json({
            data: deserializeTableData(queryRes.content, req.params.entity),
            itemsCount: queryRes.meta.totalItems
          });
        }
        break;
      case "consultants":
        if (req.query) {
          const queryRes = await ConsultantService.getAll({
            ...req.query,
            pageNumber: req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0
          });
          res.json({
            data: deserializeTableData(queryRes.content, req.params.entity),
            itemsCount: queryRes.meta.totalItems
          });
        }
        break;
      case "alumni":
        if (req.query) {
          const queryRes = await MemberService.getAll({
            ...req.query,
            pageNumber: req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0,
            isAlumni: true
          });
          res.json({
            data: deserializeTableData(queryRes.content, req.params.entity),
            itemsCount: queryRes.meta.totalItems
          });
        }
        break;
      case "positions":
        const positions = await PositionService.getAll();
        res.json(positions);
        break;
      case "poles":
        const poles = await PoleService.getAll();
        res.json(poles);
        break;
      case "departments":
        const departments = await DepartmentService.getAll();
        res.json(departments);
        break;
      default:
        break;
    }
  }

  static async exportToCSV(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Exporting ${req.params.entity} as CSV file`);
  }
}
