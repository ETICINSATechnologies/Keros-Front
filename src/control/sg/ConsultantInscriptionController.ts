import { Page } from "../../models/core/Page";
import { NextFunction, Request, Response } from "express";
import { ConsultantInscriptionService } from "../../services/sg/ConsultantInscriptionService";
import { ConsultantInscription } from "../../models/sg/ConsultantInscription";
import * as winston from "winston";
import { DepartmentService } from "../../services/core/DepartmentService";
import { Department } from "../../models/core/Department";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { DocumentResponse } from "../../models/DocumentResponse";
import HttpError from "../../util/httpError";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";
import { ConsultantInscriptionCreateRequest } from "../../models/sg/ConsultantInscriptionCreateRequest";
import { FileUploader } from "../../util/FileUploader";


export class ConsultantInscriptionController {


    viewConsultantInscriptions(req: Request, res: Response, next: NextFunction) {
        ConsultantInscriptionService.getAllConsultantInscriptions(function (err, page: Page<ConsultantInscription> | null) {
            winston.info("Getting all consultant inscriptions");
            if (err) {
                return next(err);
            }
            const options = {
                inscriptions: page,
            };

            res.render("sg/inscription/consultants/viewAll", options);
        });
    }

    viewConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantInscriptionService.getConsultantInscription(id, function (err4, inscription: ConsultantInscription | null) {
            DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
                CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                    if (err1) return next(err1);
                    if (err2) return next(err2);
                    if (err4) return next(err4);
                    const options = {
                        inscription: inscription,
                        departments: departments,
                        countries: countries,
                        action: "view"
                    };
                    res.render("sg/inscription/consultants/viewInscription", options);
                });
            });
        });
    }

    createConsultantInscription(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create consultant inscription form");
        DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
            CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                if (err1) return next(err1);
                if (err2) return next(err2);
                const options = {
                    departments: departments,
                    countries: countries,
                    action: "create"
                };
                res.render("sg/inscription/consultants/viewInscription", options);
            });
        });
    }

    updateConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantInscriptionService.getConsultantInscription(id, function (err4, inscription: ConsultantInscription | null) {
            DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
                CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                    if (err1) return next(err1);
                    if (err2) return next(err2);
                    if (err4) return next(err4);
                    const options = {
                        inscription: inscription,
                        departments: departments,
                        countries: countries,
                        action: "update"
                    };
                    res.render("sg/inscription/consultants/viewInscription", options);
                });
            });
        });
    }

    deleteConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        winston.info("Delete inscription for id " + id);
        ConsultantInscriptionService.delete(id, function (err) {
            if (err) return next(err);
            res.redirect("sg/consultant-inscription");
        });
    }

    downloadDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeId = req.params.documentTypeId;
        winston.info("Downloading doc (of type " + documentTypeId + ") for id " + id);
        ConsultantInscriptionService.downloadDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
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

    generateDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeId = req.params.documentTypeId;
        winston.info("Getting doc (of type " + documentTypeId + ") for id " + id);
        ConsultantInscriptionService.generateDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
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

    postConsultantInscriptionForm(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.body.id);

        const inscriptionRequest = new ConsultantInscriptionCreateRequest();
        inscriptionRequest.firstName = req.body.firstName;
        inscriptionRequest.lastName = req.body.lastName;
        inscriptionRequest.departmentId = parseInt(req.body.departmentId);
        inscriptionRequest.email = req.body.email;
        inscriptionRequest.phoneNumber = req.body.phoneNumber;
        inscriptionRequest.outYear = parseInt(req.body.outYear);
        inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
        inscriptionRequest.socialSecurityNumber = req.body.socialSecurityNumber;

        const addressRequest = new AddressCreateRequest();
        addressRequest.line1 = req.body.line1;
        addressRequest.line2 = req.body.line2;
        addressRequest.city = req.body.city;
        addressRequest.postalCode = req.body.postalCode;
        addressRequest.countryId = parseInt(req.body.countryId);
        inscriptionRequest.address = addressRequest;

        if (req.files !== undefined) {
            inscriptionRequest.documentIdentity = FileUploader.obtainFileBase64(req.files, "documentIdentity");
            inscriptionRequest.documentResidencePermit = FileUploader.obtainFileBase64(req.files, "documentResidencePermit");
            inscriptionRequest.documentRib = FileUploader.obtainFileBase64(req.files, "documentRib");
            inscriptionRequest.documentScolarityCertificate = FileUploader.obtainFileBase64(req.files, "documentScolarityCertificate");
            inscriptionRequest.documentVitaleCard = FileUploader.obtainFileBase64(req.files, "documentVitaleCard");
        }

        if (id) {
            ConsultantInscriptionService.update(id, inscriptionRequest, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Updated consultant inscription for id : " + id);
                res.redirect("/sg/consultant-inscription");
            });
        } else {
            ConsultantInscriptionService.createConsultantInscription(inscriptionRequest, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Created a new consultant inscription");
                res.redirect("/sg/consultant-inscription");
            });
        }

    }

    uploadDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeId = req.params.documentTypeId;
        winston.info("Uploading doc (of type " + documentTypeId + ") for id " + id);
        ConsultantInscriptionService.uploadDocument(id, documentTypeId, function (err) {
            if (err) {
                return next(err);
            }
            winston.info("Uploaded doc (of type" + documentTypeId + ") for id " + id);
            res.redirect("/sg/consultant-inscription/" + id);
        });
    }
}