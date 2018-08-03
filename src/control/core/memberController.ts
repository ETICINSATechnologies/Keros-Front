import { NextFunction, Request, Response } from "express";
import { MemberService } from "../../services/core/MemberService";
import { AddressService } from "../../services/core/AddressService";
import { Member } from "../../models/core/Member";
import { Address } from "../../models/core/Address";
import { Member } from "../../models/core/Member";
import { Meta } from "../../models/core/Meta";
import * as winston from "winston";
import {Page} from "../../models/core/Page";

export class MemberController {
    public viewMembers(req: Request, res: Response, next: NextFunction) {
        MemberService.getAllMembers(function (err, page: Page<Member> | null) {
            winston.info("Getting all members");
            if (err) {
                return next(err);
            }
            winston.debug("Page = " + page);
            const options = {
                members: page,
            };

            res.render("core/member/viewAll", options);
        });
    }

    public viewMemberForm(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create member form");
        if (req.params.id == null)
        {
            res.render("core/member/createForm");
        }
        else {
            winston.info("Params = " + req.params.id );
            let id = req.params.id;
            winston.info("Getting member form for id " + id);
            MemberService.getMember(id, function (err, member: Member | null) {
                if (err) {
                    return next(err);
                }

                const options = {
                    member: member
                };

                // On peut passer un objet directement si c'est assez facile à lire / comprendre
                res.render("core/member/createForm", options);
            });
        }
    }

    public viewMember(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        winston.info("Getting member form for id " + id);
        MemberService.getMember(id, function (err, member: Member | null) {
            if (err) {
                return next(err);
            }

            const options = {
                member: member
            };

            // On peut passer un objet directement si c'est assez facile à lire / comprendre
            res.render("core/member/viewMember", options);
        });
    }

    public postMemberForm(req: Request, res: Response, next: NextFunction) {
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let userName = req.body.userName;
        let gender = req.body.gender;
        let email = req.body.email;
        let birthday = req.body.birthday;
        let departmentId = req.body.departmentId;
        let schoolYear = req.body.schoolYear;
        let telephone = req.body.telephone;
        let line1 = req.body.line1;
        let line2 = req.body.line2;
        let city = req.body.city;
        let postalCode = req.body.postalCode;
        let countryId = req.body.countryId;
        let positionId = req.body.positionId;


        let address = new Address(undefined, line1, line2, city, postalCode, countryId);
        AddressService.getAddressId(address, function (err) {
            if (err) {
                return next(err);
            }
        });

        let user = new Member(undefined, firstName, lastName, userName, gender, email, birthday, departmentId, schoolYear, telephone, 1, positionId);
        MemberService.createMember(user, function(err) {
            if (err) {
                return next(err);
            }
            res.redirect("/core/member");
        });
    }
}
