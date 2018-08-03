import { NextFunction, Request, Response } from "express";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import * as winston from "winston";
import { Page } from "../../models/core/Page";

export class StudyController {
    public viewStudies(req: Request, res: Response, next: NextFunction) {
        StudyService.getAllStudies(function (err, page: Page<Study> | null) {
            winston.info("Getting all studies");
            if (err) {
                return next(err);
            }
            winston.debug("Page = " + page);
            const options = {
                studies: page,
            };

            res.render("ua/study/viewAll", options);
        });
    }

    public viewStudyForm(req: Request, res: Response, next: NextFunction) {
        winston.info("Getting create study form");
        if (req.params.id == null)
        {
            res.render("ua/study/createForm");
        }
        else {
            winston.info("Params = " + req.params.id );
            let id = req.params.id;
            winston.info("Getting study form for id " + id);
            StudyService.getStudy(id, function (err, study: Study | null) {
                if (err) {
                    return next(err);
                }

                const options = {
                    study: study
                };

                // On peut passer un objet directement si c'est assez facile à lire / comprendre
                res.render("ua/study/createForm", options);
            });
        }
    }

    public viewStudy(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        winston.info("Getting study form for id " + id);
        StudyService.getStudy(id, function (err, study: Study | null) {
            if (err) {
                return next(err);
            }

            const options = {
                study: study
            };

            // On peut passer un objet directement si c'est assez facile à lire / comprendre
            res.render("ua/study/viewStudy", options);
        });
    }

    public postStudyForm(req: Request, res: Response, next: NextFunction) {
        let name = req.body.name;
        let study = new Study(undefined, name);
        StudyService.createStudy(study, function(err) {
            if (err) {
                return next(err);
            }
            res.redirect("/ua/study");
        });
    }
}
