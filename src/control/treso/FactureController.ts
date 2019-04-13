import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { FactureService } from "../../services/treso/FactureService";
import { FactureCreateRequest } from "../../models/treso/FactureCreateRequest";
import { Facture } from "../../models/treso/Facture";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { FactureTypeService } from "../../services/treso/FactureTypeService";
import { DocumentResponse } from "../../models/DocumentResponse";
import HttpError from "../../util/httpError";

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
    const studyId = req.query.studyId;
    winston.info("Getting create facture form");
    if (studyId) {
      winston.info("From study " + studyId);
    }
    StudyService.getAllStudies(function (err1, studies: Page<Study> | null) {
      CountryService.getAllCountries(function (err2, countries: Country[] | null) {
        FactureTypeService.getAllFactureTypes(function (err3, types: string[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          let options = {};
          if (studyId) {
            StudyService.getStudy(studyId, function (err4, studySelected: Study | null) {
              if (err4) return next(err4);
              options = {
                studySelected: studySelected,
                studies: studies,
                countries: countries,
                types: types,
                action: "create"
              };
              res.render("treso/facture/viewFacture", options);
            });
          } else {
            options = {
              studies: studies,
              countries: countries,
              types: types,
              action: "create"
            };
            res.render("treso/facture/viewFacture", options);
          }
      });
    });
  });
  }

  public deleteFacture(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Delete facture for id " + id);
    FactureService.delete(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

  public viewFacture(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting facture for id " + id);
    FactureService.getFacture(id, function (err1, facture: Facture | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          FactureTypeService.getAllFactureTypes(function (err4, types: string[] | null) {
            if (err1) return next(err1);
            // TODO : cleaner. This request can fail if facture is not valid.
            // TODO The page should still display
            if (err2) return next(err2);
            if (err3) return next(err3);
            if (err4) return next(err4);
            const options = {
              facture : facture,
              studies: studies,
              countries: countries,
              types: types,
              action: "view"
            };
            res.render("treso/facture/viewFacture", options);
          });
        });
      });
    });
  }

  public updateFacture(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Updating facture for id " + id);
    FactureService.getFacture(id, function (err1, facture: Facture | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          FactureTypeService.getAllFactureTypes(function (err4, types: string[] | null) {
            if (err1) return next(err1);
            if (err2) return next(err2);
            if (err3) return next(err3);
            if (err4) return next(err4);
            const options = {
              facture: facture,
              studies: studies,
              countries: countries,
              types: types,
              action: "update"
            };
            res.render("treso/facture/viewFacture", options);
          });
        });
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
    if (req.body.taxPercentage) {factureRequest.taxPercentage = parseFloat(req.body.taxPercentage); } else {factureRequest.taxPercentage = 20; }
    factureRequest.dueDate = req.body.dueDate;
    factureRequest.additionalInformation = req.body.additionalInformation;

    const addressRequest = new AddressCreateRequest();
    if (req.body.line1) {addressRequest.line1 = req.body.line1; } else {addressRequest.line1 = "A compléter"; }
    addressRequest.line2 = req.body.line2;
    if (req.body.city) {addressRequest.city = req.body.city; } else {addressRequest.city = "A compléter"; }
    if (req.body.postalCode) {addressRequest.postalCode = req.body.postalCode; } else {addressRequest.postalCode = "A compléter"; }
    addressRequest.countryId = parseInt(req.body.countryId);
    factureRequest.fullAddress = addressRequest;

    if (id) {
      FactureService.update(id, factureRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Updated facture for id : " + id);
        res.redirect("/treso/facture");
      });
    } else {
      FactureService.createFacture(factureRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Created a new facture");
        res.redirect("/treso/facture");
      });
    }
  }

  public validateUa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Facture validationUA for id " + id);
    FactureService.validateUa(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

  public validatePerf(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Facture validationPerf for id " + id);
    FactureService.validatePerf(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/facture");
    });
  }

  public getDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting facture doc for id " + id);
    FactureService.getFactureDocument(id, function (err, result: DocumentResponse | null) {
      if (err) {
        return next(err);
      }
      if (result && result.location) {
        res.redirect(result.location);
      } else {
        return next(new HttpError("Error when loading document", 500));
      }
    });
  }

}