import { NextFunction, Request, Response } from "express";
import { MemberService } from "../../services/core/MemberService";
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

            res.render("core/viewAll", options);
        });
    }

    public viewMemberForm(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create member form");
        if (req.params.id == null)
        {
            res.render("core/createForm");
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
                res.render("core/createForm", options);
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
            res.render("core/viewMember", options);
        });
    }

    public postMemberForm(req: Request, res: Response, next: NextFunction) {
        let name = req.body.name;
        //let height = req.body.height;
        let user = new Member(undefined, name);
        MemberService.createMember(user, function(err){
            if (err) {
                return next(err);
            }
            res.redirect("/core/member")
        });
    }
}
