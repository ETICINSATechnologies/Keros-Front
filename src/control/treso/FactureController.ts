import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';
import { Page } from '../../models/core/Page';
import { FactureService } from '../../services/treso/FactureService';
import { FactureCreateRequest } from '../../models/treso/FactureCreateRequest';
import { Facture } from "../../models/treso/Facture";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";

export class FactureController {
  public viewFactures(req: Request, res: Response, next: NextFunction) {
    FactureService.getAllFactures(function (err, page: Page<Facture> | null) {
      winston.info("Getting all factures");
      if (err) {
        return next(err);
      }
      const options = {
        factures: page,
      };

      res.render("treso/facture/viewAll", options);
    });
  }

  public createFacture(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create facture form");
    StudyService.getAllStudies(function (err, studies: Page<Study> | null) {
      if (err) return next(err);
      const options = {
        studies: studies,
        action: "create"
      };
      res.render("treso/facture/viewFacture", options);
    });
  }

  public deleteFacture(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Delete facture for id " + id);
    FactureService.delete(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

  public viewFacture(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Getting facture for id " + id);
    FactureService.getFacture(id, function (err1, facture: Facture | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        if (err1) return next(err1);
        // TODO : cleaner. This request can fail if facture is not valid.
        // TODO The page should still display
        if (err2) return next(err2);
        const options = {
          facture : facture,
          studies: studies,
          action: "view"
        };
        res.render("treso/facture/viewFacture", options);
      });
    });
  }

  public updateFacture(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Updating facture for id " + id);
    FactureService.getFacture(id, function (err1, facture: Facture | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        const options = {
          facture: facture,
          studies: studies,
          action: "update"
        };
        res.render("treso/facture/viewFacture", options);
      });
    });
  }

  public postFactureForm(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    const factureRequest = new FactureCreateRequest();
    factureRequest.numero = req.body.numero;
    factureRequest.clientName = req.body.clientName;
    factureRequest.contactName = req.body.contactName;
    factureRequest.contactEmail = req.body.contactEmail;
    factureRequest.studyId = parseInt(req.body.studyId);
    factureRequest.type = req.body.type;
    factureRequest.amountDescription = req.body.amountDescription;
    factureRequest.subject = req.body.subject;
    factureRequest.agreementSignDate = req.body.agreementSignDate;
    factureRequest.amountHT = parseFloat(req.body.amountHT);
    factureRequest.taxPercentage = parseFloat(req.body.taxPercentage);
    factureRequest.dueDate = req.body.dueDate;
    factureRequest.additionalInformation = req.body.additionalInformation;

    const addressRequest = new AddressCreateRequest();
    addressRequest.line1 = req.body.line1;
    addressRequest.line2 = req.body.line2;
    addressRequest.city = req.body.city;
    addressRequest.postalCode = req.body.postalCode;
    addressRequest.countryId = parseInt(req.body.countryId);
    factureRequest.fullAddress = addressRequest;

    if (id) {
      FactureService.update(id, factureRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/treso/facture");
      });
    } else {
      FactureService.createFacture(factureRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/treso/facture");
      });
    }
  }

  public validateUa(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Facture validationUA for id " + id);
    FactureService.validateUa(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

  public validatePerf(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Facture validationPerf for id " + id);
    FactureService.validatePerf(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

}