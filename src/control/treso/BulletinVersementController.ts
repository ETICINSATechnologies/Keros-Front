import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { BulletinVersementService } from "../../services/treso/BulletinVersementService";
import { BulletinVersement } from "../../models/treso/BulletinVersement";
import { BulletinVersementCreateRequest } from "../../models/treso/BulletinVersementCreateRequest";
import { MemberService } from "../../services/core/MemberService";
import { Member } from "../../models/core/Member";

export class BulletinVersementController {
  public viewBulletinsVersement(req: Request, res: Response, next: NextFunction) {
    BulletinVersementService.getAllBulletinsVersement(function (err, page: Page<BulletinVersement> | null) {
      winston.info("Getting all BV");
      if (err) {
        return next(err);
      }
      const options = {
        bulletins: page,
      };

      res.render("treso/bulletinVersement/viewAll", options);
    });
  }

  public createBulletinVersement(req: Request, res: Response, next: NextFunction) {
    const studyId = req.query.studyId;
    const consultantId = req.query.consultantId;
    winston.info("Getting create BV form");
    if (studyId) {
      winston.info("From study " + studyId);
    }
    StudyService.getAllStudies(function (err1, studies: Page<Study> | null) {
      CountryService.getAllCountries(function (err2, countries: Country[] | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        let options = {};
        if (studyId) {
          StudyService.getStudy(studyId, function (err3, selectedStudy: Study | null) {
            MemberService.getMember(consultantId, function(err4, selectedConsultant: Member | null) {
              if (err3) return next(err3);
              if (err4) return next(err4);
              options = {
                selectedConsultant : selectedConsultant,
                selectedStudy: selectedStudy,
                studies: studies,
                countries: countries,
                action: "create"
              };
              res.render("treso/bulletinVersement/viewBulletinVersement", options);
            });
          });
        } else {
          options = {
            studies: studies,
            countries: countries,
            action: "create"
          };
          res.render("treso/bulletinVersement/viewBulletinVersement", options);
        }
      });
    });
  }

  public deleteBulletinVersement(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Delete BV for id " + id);
    BulletinVersementService.delete(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/payment-slip");
    });
  }

  public viewBulletinVersement(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting bulletin for id " + id);
    BulletinVersementService.getBulletinVersement(id, function (err1, bulletin: BulletinVersement | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          if (err1) return next(err1);
          // TODO : cleaner. This request can fail if facture is not valid.
          // TODO The page should still display
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            bulletin : bulletin,
            studies: studies,
            countries: countries,
            action: "view"
          };
          res.render("treso/bulletinVersement/viewBulletinVersement", options);
        });
      });
    });
  }

  public updateBulletinVersement(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Updating BV for id " + id);
    BulletinVersementService.getBulletinVersement(id, function (err1, bulletin: BulletinVersement | null) {
      StudyService.getAllStudies(function (err2, studies: Page<Study> | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            bulletin: bulletin,
            studies: studies,
            countries: countries,
            action: "update"
          };
          res.render("treso/bulletinVersement/viewBulletinVersement", options);
        });
      });
    });
  }

  public postBulletinVersementForm(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    const bulletinRequest = new BulletinVersementCreateRequest();
    bulletinRequest.missionRecapNumber = req.body.missionRecapNumber;
    bulletinRequest.consultantName = req.body.consultant.split("/")[1];
    bulletinRequest.consultantSocialSecurityNumber = req.body.consultantSocialSecurityNumber;
    bulletinRequest.email = req.body.email;
    bulletinRequest.studyId = parseInt(req.body.studyId);
    bulletinRequest.clientName = req.body.clientName;
    bulletinRequest.projectLead = req.body.clientName;
    bulletinRequest.isTotalJeh = !!req.body.isTotalJeh;
    bulletinRequest.isStudyPaid = !!req.body.isStudyPaid;
    bulletinRequest.amountDescription = req.body.amountDescription;

    const addressRequest = new AddressCreateRequest();
    if (req.body.line1) {addressRequest.line1 = req.body.line1; } else {addressRequest.line1 = "A compléter"; }
    addressRequest.line2 = req.body.line2;
    if (req.body.city) {addressRequest.city = req.body.city; } else {addressRequest.city = "A compléter"; }
    if (req.body.postalCode) {addressRequest.postalCode = req.body.postalCode; } else {addressRequest.postalCode = "A compléter"; }
    addressRequest.countryId = parseInt(req.body.countryId);
    bulletinRequest.address = addressRequest;

    if (id) {
      BulletinVersementService.update(id, bulletinRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Updated BV for id : " + id);
        res.redirect("/treso/payment-slip");
      });
    } else {
      BulletinVersementService.createBulletinVersement(bulletinRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Created a new BV");
        res.redirect("/treso/payment-slip");
      });
    }
  }

  public validateUa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("BV validationUA for id " + id);
    BulletinVersementService.validateUa(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/payment-slip");
    });
  }

  public validatePerf(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("BV validationPerf for id " + id);
    BulletinVersementService.validatePerf(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/treso/payment-slip");
    });
  }

}