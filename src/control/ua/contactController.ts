import { NextFunction, Request, Response } from "express";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { ContactService } from "../../services/ua/ContactService";
import { Contact } from "../../models/ua/Contact";
import { Gender } from "../../models/core/Gender";
import { GenderService } from "../../services/core/GenderService";
import { ContactCreateRequest } from "../../models/ua/ContactCreateRequest";

export class ContactController {
  public viewContacts(req: Request, res: Response, next: NextFunction) {
    ContactService.getAllContacts(function (err, page: Page<Contact> | null) {
      winston.info("Getting all contacts");
      if (err) {
        return next(err);
      }
      winston.debug("Contact = " + JSON.stringify(page));
      const options = {
        contacts: page,
      };
      res.render("ua/contact/viewAll", options);
    });
  }
  public getJSONContacts(req: Request, res: Response, next: NextFunction) {
    ContactService.getAllContacts(function (err, page: Page<Contact> | null) {
      winston.info("Getting JSON contacts");
      if (err) return next(err);
      res.send(page);
    });
  }

  public viewContactForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create contact form");
    FirmService.getListOfAllFirms(function (err1, firms: Firm[] | null) {
      GenderService.getAllGenders(function (err2, genders: Gender[] | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        const options = {
          firms : firms,
          gender : genders,
        };
        res.render("ua/contact/viewContact", options);
      });
    });
  }

  public viewContact(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting Contact form for id " + id);
    ContactService.getContact(id, function (err, contact: Contact | null) {
      if (contact === null) {
        return next(err);
      }
      FirmService.getListOfAllFirms(function (err1, firms: Firm[] | null) {
        GenderService.getAllGenders(function (err2, genders: Gender[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          const options = {
            contact : contact,
            firms : firms,
            gender : genders,
          };
          res.render("ua/contact/viewContact", options);
        });
      });
    });
  }

  public postContactForm(req: Request, res: Response, next: NextFunction) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const genderId = +req.body.genderId;
    const firmId = +req.body.firmId;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const cellphone = req.body.cellphone;
    const position = req.body.position;
    const notes = req.body.notes;
    let old = req.body.old;
    old = !!old;
    const contact = new ContactCreateRequest(firstName, lastName, genderId, firmId, email, telephone, cellphone, position, notes, old);
    ContactService.createContact(contact, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/ua/contact");
    });
  }
}
