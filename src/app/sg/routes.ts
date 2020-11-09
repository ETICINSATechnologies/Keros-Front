import winston from "winston";
import multer from "multer";
import { Application, Router } from "express";

import { SecretaryController } from "./controllers";
import { isSecretary } from "../../utils";

const entities = ["members", "consultants"].join("|");

export function initRoutes(app: Application) {
  winston.debug("Initializing secretary routes");
  const secretaryRouter = Router();

  secretaryRouter.route(`/registrations/:entity(${entities})`)
    .get(SecretaryController.getSearchPage);

  secretaryRouter.route(`/registrations/:entity(${entities})/:id/:action(view|modify)`)
    .get(SecretaryController.getRegistration);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/modify`)
    .post(SecretaryController.modifyRegistration);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/delete`)
    .get(SecretaryController.deleteRegistration);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/validate`)
    .post(SecretaryController.validateRegistration);

  secretaryRouter.route(`/registrations/:entity(${entities})/:id/documents/:doc`)
    .post(multer().single("file"), SecretaryController.uploadDocument);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/documents/:doc/:action(template|download)`)
    .get(SecretaryController.downloadDocument);

  secretaryRouter.route(`/data/:entity(${entities})`)
    .get(SecretaryController.getData);

  app.use("/sg", isSecretary, secretaryRouter);
}
