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
import { GenderService } from "../../services/core/GenderService";
import { Gender } from "../../models/core/Gender";
import { MemberInscriptionCreateRequest } from "../../models/sg/MemberInscriptionCreateRequest";
import { MemberInscriptionService } from "../../services/sg/MemberInscriptionService";
import { Config } from "../../config/Config";
import { UploadedFile } from "express-fileupload";

const request = require("request");

export class ConsultantInscriptionController {

    viewConsultantInscriptions(req: Request, res: Response, next: NextFunction) {
        DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
            ConsultantInscriptionService.getAllConsultantInscriptions(function (err2, page: Page<ConsultantInscription> | null) {
                winston.info("Getting all consultant inscriptions");
                if (err1) {
                    return next(err1);
                }
                if (err2) {
                    return next(err2);
                }
                const options = {
                    inscriptions: page,
                    departments
                };
                res.render("sg/inscription/consultants/viewAll", options);
            }, req.query);
        });
    }

    viewConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantInscriptionService.getConsultantInscription(id, function (err1, inscription: ConsultantInscription | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                CountryService.getAllCountries(function (err3, countries: Country[] | null) {
                    GenderService.getAllGenders(function (err4, genders: Gender[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            inscription,
                            departments,
                            countries,
                            gender: genders,
                            action: "view"
                        };
                        res.render("sg/inscription/consultants/viewInscription", options);
                    });
                });
            });
        });
    }

    createConsultantInscription(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create consultant inscription form");
        DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
            CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
                    if (err1) return next(err1);
                    if (err2) return next(err2);
                    if (err3) return next(err3);
                    const options = {
                        departments,
                        countries,
                        gender: genders,
                        action: "create"
                    };
                    res.render("sg/inscription/consultants/viewInscription", options);
                });
            });
        });
    }

    updateConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantInscriptionService.getConsultantInscription(id, function (err1, inscription: ConsultantInscription | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                CountryService.getAllCountries(function (err3, countries: Country[] | null) {
                    GenderService.getAllGenders(function (err4, genders: Gender[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            inscription,
                            departments,
                            countries,
                            gender: genders,
                            action: "update"
                        };
                        res.render("sg/inscription/consultants/viewInscription", options);
                    });
                });
            });
        });
    }

    deleteConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        winston.info("Delete inscription for id " + id);
        ConsultantInscriptionService.delete(id, function (err) {
            if (err) return next(err);
            res.redirect("/sg/consultant-inscription");
        });
    }

    downloadDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeName = req.params.documentTypeName;
        winston.info("Downloading doc (of type " + documentTypeName + ") for id " + id);
        ConsultantInscriptionService.downloadDocument(id, documentTypeName, function (err, options: {url: string, headers: Object}) {
            if (err) {
                return next(err);
            }
            if (options) {
                request(options).pipe(res);
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
        inscriptionRequest.genderId = req.body.genderId;
        inscriptionRequest.birthday = req.body.birthday;
        inscriptionRequest.phoneNumber = req.body.phoneNumber;
        inscriptionRequest.outYear = parseInt(req.body.outYear);
        inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
        inscriptionRequest.socialSecurityNumber = req.body.socialSecurityNumber;
        inscriptionRequest.droitImage = req.body.droitImage;

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
        const documentTypeName = req.params.documentTypeName;
        winston.info("Uploading doc (of type " + documentTypeName + ") for id " + id);
        if (req.files) {
            const file = req.files;
            ConsultantInscriptionService.uploadDocument(id, documentTypeName, <UploadedFile>file.file, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Uploaded doc (of type" + documentTypeName + ") for id " + id);
                res.redirect("/sg/consultant-inscription/" + id);
            });
        }
        else {
            winston.debug("no file to upload found");
        }
    }

    public validateConsultantInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const inscriptionRequest = new ConsultantInscriptionCreateRequest();
        inscriptionRequest.firstName = req.body.firstName;
        inscriptionRequest.lastName = req.body.lastName;
        inscriptionRequest.departmentId = parseInt(req.body.departmentId);
        inscriptionRequest.email = req.body.email;
        inscriptionRequest.genderId = req.body.genderId;
        inscriptionRequest.birthday = req.body.birthday;
        inscriptionRequest.phoneNumber = req.body.phoneNumber;
        inscriptionRequest.outYear = parseInt(req.body.outYear);
        inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
        inscriptionRequest.socialSecurityNumber = req.body.socialSecurityNumber;
        inscriptionRequest.droitImage = req.body.droitImage;

        const addressRequest = new AddressCreateRequest();
        addressRequest.line1 = req.body.line1;
        addressRequest.line2 = req.body.line2;
        addressRequest.city = req.body.city;
        addressRequest.postalCode = req.body.postalCode;
        addressRequest.countryId = parseInt(req.body.countryId);
        inscriptionRequest.address = addressRequest;

        winston.info("request : " + JSON.stringify(req.files));
        if (req.files !== null && req.files !== undefined) {
            inscriptionRequest.documentIdentity = FileUploader.obtainFileBase64(req.files, "documentIdentity");
            inscriptionRequest.documentResidencePermit = FileUploader.obtainFileBase64(req.files, "documentResidencePermit");
            inscriptionRequest.documentRib = FileUploader.obtainFileBase64(req.files, "documentRib");
            inscriptionRequest.documentScolarityCertificate = FileUploader.obtainFileBase64(req.files, "documentScolarityCertificate");
            inscriptionRequest.documentVitaleCard = FileUploader.obtainFileBase64(req.files, "documentVitaleCard");
        }
        if (id) {
            ConsultantInscriptionService.validateConsultantInscription(id, inscriptionRequest, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Validated inscription " + id);
                res.redirect("/sg/consultant-inscription");
            });
        }
    }
}
