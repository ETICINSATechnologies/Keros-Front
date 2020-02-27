import { NextFunction, Request, Response } from "express";
import { ConsultantService } from "../../services/core/ConsultantService";
import { Consultant } from "../../models/core/Consultant";
import { ConsultantCreateRequest } from "../../models/core/ConsultantCreateRequest";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { DepartmentService } from "../../services/core/DepartmentService";
import { Department } from "../../models/core/Department";
import { GenderService } from "../../services/core/GenderService";
import { Gender } from "../../models/core/Gender";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";
import * as httpContext from "express-http-context";
import { isSG } from "../../util/Helper";

export class ConsultantController {
    public viewConsultants(req: Request, res: Response, next: NextFunction) {
        ConsultantService.getAllConsultants(function (err, page: Page<Consultant> | null) {
            winston.info("Getting all consultants");
            if (err) {
                return next(err);
            }
            const options = {
                consultants: page,
            };
            res.render("core/consultant/viewAll", options);
        }, req.query);
    }

    public createConsultant(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create consultant form");
        DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
            GenderService.getAllGenders(function (err2, genders: Gender[] | null) {
                CountryService.getAllCountries(function (err3, countries: Country[] | null) {
                    if (err1) return next(err1);
                    if (err2) return next(err2);
                    if (err3) return next(err3);
                    const options = {
                        departments,
                        gender: genders,
                        countries,
                        action: "create"
                    };
                    res.render("core/consultant/viewConsultant", options);
                });
            });
        });
    }

    public viewConsultant(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantService.getConsultant(id, function (err1, consultant: Consultant | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
                    CountryService.getAllCountries(function (err4, countries: Country[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            consultant,
                            departments,
                            gender: genders,
                            countries,
                            action: "view"
                        };
                        res.render("core/consultant/viewConsultant", options);
                    });
                });
            });
        });
    }

    public updateConsultant(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        ConsultantService.getConsultant(id, function (err1, consultant: Consultant | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
                    CountryService.getAllCountries(function (err4, countries: Country[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            consultant,
                            departments,
                            gender: genders,
                            countries,
                            action: "update"
                        };
                        res.render("core/consultant/viewConsultant", options);
                    });
                });
            });
        });
    }

    public postConsultantForm(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.body.id);

        const currentUserId = httpContext.get("connectedUser").id;

        const userRequest = new ConsultantCreateRequest();
        userRequest.lastName = req.body.lastName;
        userRequest.firstName = req.body.firstName;
        userRequest.username = req.body.username;
        if (req.body.password) userRequest.password = req.body.password;
        userRequest.genderId = parseInt(req.body.genderId);
        userRequest.email = req.body.email;
        userRequest.birthday = req.body.birthday;
        userRequest.departmentId = parseInt(req.body.departmentId);
        userRequest.schoolYear = parseInt(req.body.schoolYear);
        userRequest.telephone = req.body.telephone;
        userRequest.nationalityId = req.body.countryId;
        userRequest.socialSecurityNumber = req.body.socialSecurityNumber;
        userRequest.isApprentice = req.body.isApprentice === "on";
        userRequest.droitImage = req.body.isApprentice === "on"; // doesn't work because back doesn't update value
        userRequest.isGraduate = req.body.isGraduate === "on";

        const addressRequest = new AddressCreateRequest();
        addressRequest.line1 = req.body.line1;
        addressRequest.line2 = req.body.line2;
        addressRequest.city = req.body.city;
        addressRequest.postalCode = req.body.postalCode;
        addressRequest.countryId = parseInt(req.body.countryId);
        userRequest.address = addressRequest;

        if (userId) {
            ConsultantService.update(userId, userRequest, function (err1) {
                if (err1) {
                    return next(err1);
                }
                if (userId === currentUserId) {
                    ConsultantService.getConnectedConsultant(function (err2, consultant) {
                        res.cookie("connectedUser", JSON.stringify(consultant))
                            .redirect("/core/consultant/me");
                    });
                } else {
                    res.redirect("/core/consultant");
                }
            });
        } else {
            ConsultantService.createConsultant(userRequest, function (err1) {
                if (err1) {
                    return next(err1);
                }
                res.redirect("/core/consultant");
            });
        }
    }

    public viewProfile(req: Request, res: Response, next: NextFunction) {
        ConsultantService.getConnectedConsultant(function (err1, consultant: Consultant | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
                    CountryService.getAllCountries(function (err4, countries: Country[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            consultant,
                            page: "profile",
                            departments,
                            gender: genders,
                            countries,
                            action: "view"
                        };
                        res.render("core/consultant/viewProfile", options);
                    });
                });
            });
        });
    }

    public updateProfile(req: Request, res: Response, next: NextFunction) {
        ConsultantService.getConnectedConsultant(function (err1, consultant: Consultant | null) {
            DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
                GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
                    CountryService.getAllCountries(function (err4, countries: Country[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        const options = {
                            consultant,
                            page: "profile",
                            departments,
                            gender: genders,
                            countries,
                            action: "update"
                        };
                        res.render("core/consultant/viewProfile", options);
                    });
                });
            });
        });
    }

    public deleteConsultant(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        winston.info("Deleting Consultant for id " + userId);
        ConsultantService.delete(userId, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/core/consultant");
        });
    }

    public getJSONConsultants(req: Request, res: Response, next: NextFunction) {
        const queryParams = req.query;
        ConsultantService.getAllConsultants(function (err, page: Page<Consultant> | null) {
            winston.debug("Getting JSON consultants with specified parameters : " + JSON.stringify(queryParams));
            if (err) return next(err);
            res.send(page);
        }, queryParams);
    }

}
