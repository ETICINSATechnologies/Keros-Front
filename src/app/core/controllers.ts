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

export class CoreController {
  static getDashboard(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting dashboard");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    res.render("core/dashboard", {
      connectedUser,
      route: req.originalUrl
    });
  }

  static getConnectedProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Getting connected profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    Promise.all([
      DepartmentService.getAll(),
      GenderService.getAll(),
      CountryService.getAll(),
      PositionService.getAll(),
      PoleService.getAll()
    ]).then(([
      departments,
      genders,
      countries,
      positions,
      poles
    ]) => {
      res.render("core/profile", {
        connectedUser,
        route: req.originalUrl,
        isMember,
        departments,
        genders,
        countries,
        positions,
        poles,
        modify: false
      });
    });
  }

  static getProfile(req: Request, res: Response, next: NextFunction) {

  }

  static enableModifyProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Enabling modification on connected profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    Promise.all([
      DepartmentService.getAll(),
      GenderService.getAll(),
      CountryService.getAll(),
      PositionService.getAll(),
      PoleService.getAll()
    ]).then(([
      departments,
      genders,
      countries,
      positions,
      poles
    ]) => {
      res.render("core/profile", {
        connectedUser,
        route: req.originalUrl,
        isMember,
        departments,
        genders,
        countries,
        positions,
        poles,
        modify: true
      });
    });
  }

  static async modifyProfile(req: Request, res: Response, next: NextFunction) {
    winston.verbose("Modifying profile");
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    if (!req.body.password) {
      delete req.body.password;
    }

    if (connectedUser.id === parseInt(req.body.id)) {
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
      res.redirect("/profile/me");
    }
  }

  static async getSearchPage(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Getting search page for ${req.params.entity}`);

    const connectedUser = JSON.parse(req.cookies.connectedUser);
    res.render("core/search", {
      connectedUser,
      route: req.originalUrl
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
          const data = queryRes.content.map((member: Member) => {
            const positionId = member.positions && member.positions[0] ?
              member.positions[0].id : null;
            const poleId = member.positions && member.positions[0] && member.positions[0].pole ?
              member.positions[0].pole.id : null;
            return {
              id: member.id,
              username: member.username,
              lastName: member.lastName,
              firstName: member.firstName,
              email: member.email,
              positionId,
              poleId
            };
          });
          res.json({
            data,
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
          const data = queryRes.content.map((member: Member) => {
            return {
              username: member.username,
              lastName: member.lastName,
              firstName: member.firstName,
              email: member.email
            };
          });
          res.json({
            data,
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
          const data = queryRes.content.map((member: Member) => {
            const positionId = member.positions && member.positions[0] ?
              member.positions[0].id : null;
            const poleId = member.positions && member.positions[0] && member.positions[0].pole ?
              member.positions[0].pole.id : null;
            return {
              username: member.username,
              lastName: member.lastName,
              firstName: member.firstName,
              email: member.email,
              positionId,
              poleId
            };
          });
          res.json({
            data,
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
      default:
        break;
    }
  }

  static async exportToCSV(req: Request, res: Response, next: NextFunction) {
    winston.verbose(`Exporting ${req.params.entity} to CSV file`);
  }
}
