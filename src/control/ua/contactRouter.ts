import * as winston from "winston";
import { Router } from "express";
import { secureRouter } from "../secureRouter";
import { ContactController } from "./contactController";

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
  router.get("/create", contactController.viewContactForm);
  router.post("/createform", contactController.postContactForm);
  router.get("/update/:id(\\d+)/", contactController.viewContact);
  router.post("/update", contactController.postContactForm);
  router.get("/json", contactController.viewJSONContacts);

  return router;
}