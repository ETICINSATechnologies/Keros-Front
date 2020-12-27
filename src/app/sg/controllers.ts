import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { DepartmentService, GenderService, CountryService, PoleService } from "../core/services";

import { MemberRegistrationRequest, ConsultantRegistrationRequest } from "./models";
import { MemberRegistrationService, ConsultantRegistrationService } from "./services";
import { prepareFilePayload, formatTableData, formatFormFields } from "./helpers";

export class SecretaryController {
  static async getRegistration(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Getting registration ID ${req.params.id} of ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    const id = parseInt(req.params.id, 10);

    let viewed;
    switch (req.params.entity) {
      case "consultants":
        viewed = await ConsultantRegistrationService.getProtected(id);
        break;
      case "members":
        viewed = await MemberRegistrationService.get(id);
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
      deleteRoute : `/sg/registrations/${req.params.entity}/${id}/delete`,
      entity: req.params.entity,
      action: req.params.action
    });
  }

  static async modifyRegistration(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Modifying registration with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);
    const form = formatFormFields(req.body, req.params.entity);

    switch (req.params.entity) {
      case "consultants": {
        const cForm = form as ConsultantRegistrationRequest;
        await ConsultantRegistrationService.update(id, cForm);
        break;
      }
      case "members": {
        const mForm = form as MemberRegistrationRequest;
        await MemberRegistrationService.update(id, mForm);
        break;
      }
      default:
        break;
    }

    res.redirect(`/sg/registrations/${req.params.entity}/${req.params.id}/view`);
  }

  static async deleteRegistration(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Deleting registration with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);

    switch (req.params.entity) {
      case "consultants":
        await ConsultantRegistrationService.delete(id);
        break;
      case "members":
        await MemberRegistrationService.delete(id);
        break;
      default:
        break;
    }

    res.redirect(`/sg/registrations/${req.params.entity}`);
  }

  static async validateRegistration(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Validating registration with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);

    switch (req.params.entity) {
      case "consultants":
        await ConsultantRegistrationService.validate(id);
        break;
      case "members":
        await MemberRegistrationService.validate(id);
        break;
      default:
        break;
    }

    res.redirect(`/sg/registrations/${req.params.entity}`);
  }

  static async getSearchPage(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Getting search page for ${req.params.entity}`);
    const connectedUser = JSON.parse(req.cookies.connectedUser);
    const isMember = req.cookies.isMember;

    let title;
    let addRoute;
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

  static async getData(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Getting registrations of ${req.params.entity}`);

    const pageNumber = req.query.pageIndex ? Number(req.query.pageIndex) - 1 : 0;
    let queryRes;
    switch (req.params.entity) {
      case "consultants":
        queryRes = await ConsultantRegistrationService.getAll({
          ...req.query,
          pageNumber
        });
        res.json({
          data: formatTableData(queryRes.content, req.params.entity),
          itemsCount: queryRes.meta.totalItems
        });
        break;
      case "members":
        queryRes = await MemberRegistrationService.getAll({
          ...req.query,
          pageNumber
        });
        res.json({
          data: formatTableData(queryRes.content, req.params.entity),
          itemsCount: queryRes.meta.totalItems
        });
        break;
      default:
        break;
    }
  }

  static async uploadDocument(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Uploading document with ID ${req.params.doc} of registration with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);
    const doc = parseInt(req.params.doc, 10);
    const data = prepareFilePayload(`${req.file.destination}${req.file.filename}`);

    switch (req.params.entity) {
      case "consultants":
        break;
      case "members":
        await MemberRegistrationService.uploadDocument(id, doc, data);
        break;
      default:
        break;
    }

    res.redirect(`/sg/registrations/${req.params.entity}/${id}/view`);
  }

  static async downloadDocument(req: Request, res: Response, _next: NextFunction): Promise<void> {
    winston.verbose(`Getting document with ID ${req.params.doc} of registration with ID ${req.params.id}`);

    const id = parseInt(req.params.id, 10);

    let doc;
    let response;
    switch (`${req.params.entity}-${req.params.action}`) {
      case "consultants-download":
        doc = req.params.doc;
        response = await ConsultantRegistrationService.getDocument(id, doc);
        res.redirect(response.location);
        break;
      case "consultants-template":
        doc = req.params.doc;
        response = await ConsultantRegistrationService.getDocument(id, doc);
        res.redirect(response.location);
        break;
      case "members-download":
        doc = parseInt(req.params.doc, 10);
        response = await MemberRegistrationService.getDocument(id, doc);
        res.redirect(response.location);
        break;
      case "members-template":
        doc = parseInt(req.params.doc, 10);
        response = await MemberRegistrationService.getTemplate(id, doc);
        res.redirect(response.location);
        break;
      default:
        break;
    }
  }
}