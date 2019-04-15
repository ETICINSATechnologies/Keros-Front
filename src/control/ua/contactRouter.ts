import * as winston from "winston";
import { Router } from "express";
import { secureRouter } from "../secureRouter";
import { ContactController } from "./ContactController";

/**
 * Router for members for /firm/**
 * @returns {e.Router}
 */

export function contactRouter(): Router {
  winston.debug("Mapping Contacts routes");
  const contactController: ContactController = new ContactController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", contactController.viewContacts);
  router.get("/:id(\\d+)/", contactController.viewContact);
  router.get("/create", contactController.createContact);
  router.get("/update/:id(\\d+)/", contactController.updateContact);
  router.post("/postform", contactController.postContactForm);

  router.get("/json", contactController.getJSONContacts);
  router.get("/delete/:id(\\d+)/", contactController.deleteContact);
  return router;
}
