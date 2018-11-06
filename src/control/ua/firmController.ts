import { NextFunction, Request, Response } from "express";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { Address } from "../../models/core/Address";
import { FirmCreateRequest } from "../../models/ua/FirmCreateRequest";
import { FirmTypeService } from "../../services/ua/FirmTypeService";
import { FirmType } from "../../models/ua/FirmType";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { AddressService } from "../../services/core/AddressService";

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
    FirmTypeService.getAllFirmTypes(function (err1, firmTypes: FirmType[] | null) {
      CountryService.getAllCountries(function (err2, countries: Country[] | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        const options = {
          firmTypes: firmTypes,
          countries: countries,
        };
        winston.debug("FirmType : " + JSON.stringify(firmTypes));
        res.render("ua/firm/viewFirm", options);
      });
    });
  }

  public viewFirm(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Getting Firm form for id " + id);
    FirmService.getFirm(id, function (err1, firm: Firm | null) {
      if (firm === null) {
        return next(err1);
      }
      FirmTypeService.getAllFirmTypes(function (err2, firmTypes: FirmType[] | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            firm: firm,
            firmTypes: firmTypes,
            countries: countries,
          };
          res.render("ua/firm/viewFirm", options);
        });
      });
    });
  }

  public postFirmForm(req: Request, res: Response, next: NextFunction) {
    const id = +req.body.id;
    const name = req.body.name;
    const siret = req.body.siret;
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const countryId = +req.body.countryId;
    const typeId = +req.body.typeId;
    const address = new Address(1, line1, line2, postalCode, city, new Country(countryId));
    const firm = new FirmCreateRequest(siret, name, address, typeId);
    if (id) {
      FirmService.update(id, firm, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/firm");
      });
    } else {
      FirmService.createFirm(firm, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/firm");
      });
    }
  }
}
