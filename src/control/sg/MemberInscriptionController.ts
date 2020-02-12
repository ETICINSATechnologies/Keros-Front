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
import HttpError from "../../util/httpError";
import { GenderService } from "../../services/core/GenderService";
import { Gender } from "../../models/core/Gender";
import { MemberService } from "../../services/core/MemberService";
import { Member } from "../../models/core/Member";
import { UploadedFile } from "express-fileupload";

export class MemberInscriptionController {
    public viewMemberInscriptions(req: Request, res: Response, next: NextFunction) {
        MemberInscriptionService.getAllMemberInscriptions(function (err, page: Page<MemberInscription> | null) {
            winston.info("Getting all member inscriptions");
            if (err) {
                return next(err);
            }
            const options = {
                inscriptions: page,
            };

            res.render("sg/inscription/members/viewAll", options);
        }, req.query);
    }

    public createMemberInscription(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create member inscription form");
        DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
            CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                PoleService.getAllPoles(function (err3, poles: Pole[] | null) {
                    GenderService.getAllGenders(function (err4, genders: Gender[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            departments,
                            countries,
                            gender: genders,
                            poles,
                            action: "create"
                        };
                        res.render("sg/inscription/members/viewInscription", options);
                    });
                });
            });
        });
    }

    public deleteMemberInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        winston.info("Delete inscription for id " + id);
        MemberInscriptionService.delete(id, function (err) {
            if (err) return next(err);
            res.redirect("/sg/membre-inscription");
        });
    }

    public viewMemberInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        MemberInscriptionService.getMemberInscription(id, function (err4, inscription: MemberInscription | null) {
            DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
                CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                    PoleService.getAllPoles(function (err3, poles: Pole[] | null) {
                        GenderService.getAllGenders(function (err5, genders: Gender[] | null) {
                            if (err1) return next(err1);
                            if (err2) return next(err2);
                            if (err3) return next(err3);
                            if (err4) return next(err4);
                            if (err5) return next(err5);
                            const options = {
                                inscription,
                                departments,
                                countries,
                                gender: genders,
                                poles,
                                action: "view"
                            };
                            res.render("sg/inscription/members/viewInscription", options);
                        });
                    });
                });
            });
        });
    }

    public updateMemberInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        MemberInscriptionService.getMemberInscription(id, function (err4, inscription: MemberInscription | null) {
            DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
                CountryService.getAllCountries(function (err2, countries: Country[] | null) {
                    PoleService.getAllPoles(function (err3, poles: Pole[] | null) {
                        GenderService.getAllGenders(function (err5, genders: Gender[] | null) {
                            if (err1) return next(err1);
                            if (err2) return next(err2);
                            if (err3) return next(err3);
                            if (err4) return next(err4);
                            if (err5) return next(err5);
                            const options = {
                                inscription,
                                departments,
                                countries,
                                gender: genders,
                                poles,
                                action: "update"
                            };
                            res.render("sg/inscription/members/viewInscription", options);
                        });
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
        inscriptionRequest.genderId = parseInt(req.body.genderId);
        inscriptionRequest.birthday = req.body.birthday;
        inscriptionRequest.phoneNumber = req.body.phoneNumber;
        inscriptionRequest.outYear = parseInt(req.body.outYear);
        inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
        inscriptionRequest.wantedPoleId = parseInt(req.body.wantedPoleId);
        inscriptionRequest.hasPaid = req.body.hasPaid;
        inscriptionRequest.droitImage = req.body.droitImage;

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

    public validateMemberInscription(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const inscriptionRequest = new MemberInscriptionCreateRequest();
        inscriptionRequest.firstName = req.body.firstName;
        inscriptionRequest.lastName = req.body.lastName;
        inscriptionRequest.departmentId = parseInt(req.body.departmentId);
        inscriptionRequest.email = req.body.email;
        inscriptionRequest.genderId = parseInt(req.body.genderId);
        inscriptionRequest.birthday = req.body.birthday;
        inscriptionRequest.phoneNumber = req.body.phoneNumber;
        inscriptionRequest.outYear = parseInt(req.body.outYear);
        inscriptionRequest.nationalityId = parseInt(req.body.nationalityId);
        inscriptionRequest.wantedPoleId = parseInt(req.body.wantedPoleId);
        inscriptionRequest.hasPaid = req.body.hasPaid;
        inscriptionRequest.droitImage = req.body.droitImage;

        const addressRequest = new AddressCreateRequest();
        addressRequest.line1 = req.body.line1;
        addressRequest.line2 = req.body.line2;
        addressRequest.city = req.body.city;
        addressRequest.postalCode = req.body.postalCode;
        addressRequest.countryId = parseInt(req.body.countryId);
        inscriptionRequest.address = addressRequest;
        if (id) {
            MemberInscriptionService.validateMemberInscription(id, inscriptionRequest, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Validated inscription " + id);
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
            if (result && result.location) {
                res.redirect(result.location);
            } else {
                return next(new HttpError("Error when loading document", 500));
            }
        });
    }

    public uploadDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeId = req.params.documentTypeId;
        winston.info("Uploading doc (of type " + documentTypeId + ") for id " + id);
        if (req.files) {
            const file = req.files;
            winston.info("file : " + JSON.stringify(file));
             MemberInscriptionService.uploadDocument(id, documentTypeId, <UploadedFile>file.file, function (err) {
                if (err) {
                    return next(err);
                }
                winston.info("Uploaded doc (of type" + documentTypeId + ") for id " + id);
                res.redirect("/sg/membre-inscription/" + id);
            });
        }
        else {
            winston.debug("no file found");
        }
    }

    public downloadDocument(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const documentTypeId = req.params.documentTypeId;
        winston.info("Downloading doc (of type " + documentTypeId + ") for id " + id);
        MemberInscriptionService.downloadDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
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
