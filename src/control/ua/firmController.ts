import { NextFunction, Request, Response } from "express";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import * as winston from "winston";
import {Page} from "../../models/core/Page";

export class FirmController {
    public viewFirms(req: Request, res: Response, next: NextFunction) {
        FirmService.getAllFirms(function (err, page: Page<Firm> | null) {
            winston.info("Getting all firms");
            if (err) {
                return next(err);
            }
            winston.debug("Page = " + page);
            const options = {
                firms: page,
            };

            res.render("ua/viewAll", options);
        });
    }

    public viewFirmForm(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create firm form");
        if (req.params.id == null)
        {
            res.render("ua/createForm");
        }
        else {
            winston.info("Params = " + req.params.id );
            let id = req.params.id;
            winston.info("Getting firm form for id " + id);
            FirmService.getFirm(id, function (err, firm: Firm | null) {
                if (err) {
                    return next(err);
                }

                const options = {
                    firm: firm
                };

                // On peut passer un objet directement si c'est assez facile à lire / comprendre
                res.render("ua/createForm", options);
            });
        }
    }

    public viewFirm(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        winston.info("Getting member form for id " + id);
        FirmService.getFirm(id, function (err, firm: Firm | null) {
            if (err) {
                return next(err);
            }

            const options = {
                firm: firm
            };

            // On peut passer un objet directement si c'est assez facile à lire / comprendre
            res.render("ua/viewFirm", options);
        });
    }

    public postFirmForm(req: Request, res: Response, next: NextFunction) {
        let name = req.body.name;
        let firm = new Firm(undefined, name);
        FirmService.createFirm(firm, function(err){
            if (err) {
                return next(err);
            }
            res.redirect("/ua/firm")
        });
    }
}
