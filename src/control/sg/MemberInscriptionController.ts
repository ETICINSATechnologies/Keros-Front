import { NextFunction, Request, Response } from "express";
import { MemberInscriptionService } from "../../services/sg/MemberInscriptionService";
import { MemberInscription } from "../../models/sg/MemberInscription";
import { Page } from "../../models/core/Page";
import * as winston from "winston";
import { DepartmentService } from "../../services/core/DepartmentService";
import { Department } from "../../models/core/Department";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { PoleService } from "../../services/core/PoleService";
import { Pole } from "../../models/core/Pole";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";
import { DocumentResponse } from "../../models/DocumentResponse";

export class MemberInscriptionController {
  public viewMemberInscriptions(req: Request, res: Response, next: NextFunction) {
    MemberInscriptionService.getAllMemberInscriptions(function(err, page: Page<MemberInscription> | null) {
      winston.info("Getting all member inscriptions");
      if (err) {
        return next(err);
      }
      const options = {
        inscriptions: page,
      };

      res.render("treso/facture/viewAll", options);
    });
  }

  public createMemberInscription(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create member inscription form");
    DepartmentService.getAllDepartments(function(err1, departments: Department[] | null) {
      CountryService.getAllCountries(function(err2, countries: Country[] |  null) {
        PoleService.getAllPoles(function(err3, poles: Pole[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            departments: departments,
            countries: countries,
            poles: poles,
            action: "create"
          };
          res.render("sg/membre-inscription/viewInscription", options);
        });
      });
    });
  }

  public deleteMemberInscription(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Delete inscription for id " + id);
    MemberInscriptionService.delete(id, function(err) {
      if (err) return next(err);
      res.redirect("sg/membre-inscription");
    });
  }

  public viewMemberInscription(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    MemberInscriptionService.getMemberInscription(id, function(err4, inscription: MemberInscription | null) {
      DepartmentService.getAllDepartments(function(err1, departments: Department[] | null) {
        CountryService.getAllCountries(function(err2, countries: Country[] |  null) {
          PoleService.getAllPoles(function(err3, poles: Pole[] | null) {
            if (err1) return next(err1);
            if (err2) return next(err2);
            if (err3) return next(err3);
            if (err4) return next(err4);
            const options = {
              inscription: inscription,
              departments: departments,
              countries: countries,
              poles: poles,
              action: "view"
            };
            res.render("sg/membre-inscription/viewInscription", options);
          });
        });
      });
    });
  }

  public updateMemberInscription(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    MemberInscriptionService.getMemberInscription(id, function(err4, inscription: MemberInscription | null) {
      DepartmentService.getAllDepartments(function(err1, departments: Department[] | null) {
        CountryService.getAllCountries(function(err2, countries: Country[] |  null) {
          PoleService.getAllPoles(function(err3, poles: Pole[] | null) {
            if (err1) return next(err1);
            if (err2) return next(err2);
            if (err3) return next(err3);
            if (err4) return next(err4);
            const options = {
              inscription: inscription,
              departments: departments,
              countries: countries,
              poles: poles,
              action: "update"
            };
            res.render("sg/membre-inscription/viewInscription", options);
          });
        });
      });
    });
  }

  public postMemberInscriptionForm(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    const inscriptionRequest = new MemberInscriptionCreateRequest();
    inscriptionRequest.firstName = req.body.firstName;
    inscriptionRequest.lastName = req.body.lastName;
    inscriptionRequest.departmentId = parseInt(req.body.departmentId);
    inscriptionRequest.email = req.body.email;
    inscriptionRequest.phoneNumber = req.body.phoneNumber;
    inscriptionRequest.outYear = parseInt(req.body.outYear);
    inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
    inscriptionRequest.wantedPoleId = parseInt(req.body.wantedPoleId);

    const addressRequest = new AddressCreateRequest();
    addressRequest.line1 = req.body.line1;
    addressRequest.line2 = req.body.line2;
    addressRequest.city = req.body.city;
    addressRequest.postalCode = req.body.postalCode;
    addressRequest.countryId = parseInt(req.body.countryId);
    inscriptionRequest.address = addressRequest;

    if (id) {
      MemberInscriptionService.update(id, inscriptionRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Updated member inscription for id : " + id);
        res.redirect("/sg/membre-inscription");
      });
    } else {
      MemberInscriptionService.createMemberInscription(inscriptionRequest, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Created a new member inscription");
        res.redirect("/sg/membre-inscription");
      });
    }

  }

  public generateDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;
    winston.info("Getting doc (of type " + documentTypeId + ") for id " + id);
    MemberInscriptionService.generateDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
  }

  public uploadDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;
    winston.info("Uploading doc (of type " + documentTypeId + ") for id " + id);
    MemberInscriptionService.uploadDocument(id, documentTypeId, function (err) {
      if (err) {
        return next(err);
      }
      winston.info("Uploaded doc (of type" + documentTypeId + ") for id " + id);
    });
  }

  public downloadDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;
    winston.info("Getting doc (of type " + documentTypeId + ") for id " + id);
    MemberInscriptionService.generateDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
  }
}