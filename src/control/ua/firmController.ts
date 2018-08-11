import { NextFunction, Request, Response } from "express";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import * as winston from "winston";
import { Page } from "../../models/core/Page";

export class FirmController {
  public viewFirms(req: Request, res: Response, next: NextFunction) {
    FirmService.getAllFirms(function (err, page: Page<Firm> | null) {
      winston.info("Getting all firms");
      if (err) {
        return next(err);
      }
      winston.debug("Page = " + JSON.stringify(page));
      const options = {
        firms: page,
      };

      res.render("ua/firm/viewAll", options);
    });
  }

  public viewFirmForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create firm form");
    if (req.params.id == null) {
      res.render("ua/firm/createForm");
    }
    else {
      winston.info("Params = " + req.params.id);
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
        res.render("ua/firm/createForm", options);
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
      res.render("ua/firm/viewFirm", options);
    });
  }

  public postFirmForm(req: Request, res: Response, next: NextFunction) {
    let name = req.body.name;
    let siret = req.body.siret;
    let line1 = req.body.line1;
    let line2 = req.body.line2;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    let countryId = req.body.countryId;
    let typeId = req.body.typeId;

    let firm = new Firm(undefined, name, siret, 1, typeId);
    FirmService.createFirm(firm, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/ua/firm");
    });
  }
}
