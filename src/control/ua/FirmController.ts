import { NextFunction, Request, Response } from "express";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { FirmCreateRequest } from "../../models/ua/FirmCreateRequest";
import { FirmTypeService } from "../../services/ua/FirmTypeService";
import { FirmType } from "../../models/ua/FirmType";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { AddressCreateRequest } from "../../models/core/AddressCreateRequest";

export class FirmController {
  public viewFirms(req: Request, res: Response, next: NextFunction) {
    FirmService.getAllFirms(function (err, page: Page<Firm> | null) {
      winston.info("Getting all firms");
      if (err) {
        return next(err);
      }
      const options = {
        firms: page,
      };
      res.render("ua/firm/viewAll", options);
    });
  }

  public createFirm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create firm form");
    FirmTypeService.getAllFirmTypes(function (err1, firmTypes: FirmType[] | null) {
      CountryService.getAllCountries(function (err2, countries: Country[] | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        const options = {
          firmTypes: firmTypes,
          countries: countries,
          action: "create"
        };
        res.render("ua/firm/viewFirm", options);
      });
    });
  }

  public viewFirm(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting Firm for id " + id);
    FirmService.getFirm(id, function (err1, firm: Firm | null) {
      FirmTypeService.getAllFirmTypes(function (err2, firmTypes: FirmType[] | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            firm: firm,
            firmTypes: firmTypes,
            countries: countries,
            action: "view"
          };
          res.render("ua/firm/viewFirm", options);
        });
      });
    });
  }

  public updateFirm(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Updating Firm for id " + id);
    FirmService.getFirm(id, function (err1, firm: Firm | null) {
      FirmTypeService.getAllFirmTypes(function (err2, firmTypes: FirmType[] | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            firm: firm,
            firmTypes: firmTypes,
            countries: countries,
            action: "update"
          };
          res.render("ua/firm/viewFirm", options);
        });
      });
    });
  }

  public postFirmForm(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    const firmRequest = new FirmCreateRequest();
    firmRequest.name = req.body.name;
    firmRequest.siret = req.body.siret;
    firmRequest.typeId = parseInt(req.body.typeId);

    const addressRequest = new AddressCreateRequest();
    addressRequest.line1 = req.body.line1;
    addressRequest.line2 = req.body.line2;
    addressRequest.city = req.body.city;
    addressRequest.postalCode = req.body.postalCode;
    addressRequest.countryId = parseInt(req.body.countryId);
    firmRequest.address = addressRequest;

    if (id) {
      FirmService.update(id, firmRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/firm");
      });
    } else {
      FirmService.createFirm(firmRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/firm");
      });
    }
  }

  public deleteFirm(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    FirmService.delete(id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/ua/firm");
    });

  }

  public getJSONFirms(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query;
    FirmService.getAllFirms(function (err, page: Page<Firm> | null) {
      winston.debug("Getting JSON firms with specified parameters : " + JSON.stringify(queryParams));
      if (err) return next(err);
      res.send(page);
    }, queryParams);
  }
}
