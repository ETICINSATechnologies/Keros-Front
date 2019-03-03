import {NextFunction, Request, Response} from "express";
import {FirmService} from "../../services/ua/FirmService";
import {Firm} from "../../models/ua/Firm";
import * as winston from "winston";
import {Page} from "../../models/core/Page";
import {ContactService} from "../../services/ua/ContactService";
import {Contact} from "../../models/ua/Contact";
import {Gender} from "../../models/core/Gender";
import {GenderService} from "../../services/core/GenderService";
import {ContactCreateRequest} from "../../models/ua/ContactCreateRequest";

export class ContactController {
  public viewContacts(req: Request, res: Response, next: NextFunction) {
    ContactService.getAllContacts(function (err, page: Page<Contact> | null) {
      winston.info("Getting all contacts");
      if (err) {
        return next(err);
      }
      const options = {
        contacts: page,
      };
      res.render("ua/contact/viewAll", options);
    });
  }

  public getJSONContacts(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query;
    ContactService.getAllContacts(function (err, page: Page<Contact> | null) {
      winston.debug("Getting JSON contacts for specified firmId : " + JSON.stringify(queryParams));
        if (err) return next(err);
        res.send(page);
    }, queryParams);
  }

  public createContact(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create contact form");
    FirmService.getAllFirms(function (err1, firms: Page<Firm> | null) {
      GenderService.getAllGenders(function (err2, genders: Gender[] | null) {
        if (err1) return next(err1);
        if (err2) return next(err2);
        const options = {
          firms : firms,
          gender : genders,
          action: "create"
        };
        res.render("ua/contact/viewContact", options);
      });
    });
  }

  public viewContact(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Getting Contact for id " + id);
    ContactService.getContact(id, function (err1, contact: Contact | null) {
      FirmService.getAllFirms(function (err2, firms: Page<Firm> | null) {
        GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            contact : contact,
            firms : firms,
            gender : genders,
            action: "view"
          };
          res.render("ua/contact/viewContact", options);
        });
      });
    });
  }

  public updateContact(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Updating Contact for id " + id);
    ContactService.getContact(id, function (err1, contact: Contact | null) {
      FirmService.getAllFirms(function (err2, firms: Page<Firm> | null) {
        GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
          if (err1) return next(err1);
          if (err2) return next(err2);
          if (err3) return next(err3);
          const options = {
            contact : contact,
            firms : firms,
            gender : genders,
            action: "update",
          };
          res.render("ua/contact/viewContact", options);
        });
      });
    });
  }

  public deleteContact(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    winston.info("Deleting Contact for id " + id);
    if (id) {
      ContactService.delete(id, function (err1) {
        if (err1) {
          return next(err1);
        }
        res.redirect("/ua/contact");
      });
    }
  }

  public postContactForm(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    const contactRequest = new ContactCreateRequest();
    contactRequest.firstName = req.body.firstName;
    contactRequest.lastName = req.body.lastName;
    contactRequest.genderId = parseInt(req.body.genderId);
    contactRequest.firmId = parseInt(req.body.firmId);
    contactRequest.email = req.body.email;
    contactRequest.telephone = req.body.telephone;
    contactRequest.cellphone = req.body.cellphone;
    contactRequest.position = req.body.position;
    contactRequest.notes = req.body.notes;
    contactRequest.old = !!req.body.old;

      if (id) {
        ContactService.update(id, contactRequest, function (err1) {
          if (err1) {
            return next(err1);
          }
          res.redirect("/ua/contact");
        });
      } else {
        ContactService.createContact(contactRequest, function (err1) {
          if (err1) {
            return next(err1);
          }
          res.redirect("/ua/contact");
        });
      }
    }
}
