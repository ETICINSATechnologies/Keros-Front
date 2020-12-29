import winston from "winston";
import multer from "multer";
import { Application, Router } from "express";

import { secureController } from "../common/helpers";

import { SecretaryController } from "./controllers";
import { hasHRCredentials } from "../../utils";

const upload = multer({ dest: "./" });
const entities = ["members", "consultants"].join("|");

export function initRoutes(app: Application): void {
  winston.debug("Initializing secretary routes");
  const secretaryRouter = Router();

  const secureSecretaryController = secureController(SecretaryController);

  secretaryRouter.route(`/registrations/:entity(${entities})`)
    .get(secureSecretaryController.getSearchPage);
  secretaryRouter.route(`/registrations/:entity(${entities})/add`)
    .get(secureSecretaryController.getRegistrationPage)
    .post(secureSecretaryController.addRegistration);

  secretaryRouter.route(`/registrations/:entity(${entities})/:id/:action(view|modify)`)
    .get(secureSecretaryController.getRegistrationPage);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/modify`)
    .post(secureSecretaryController.modifyRegistration);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/delete`)
    .get(secureSecretaryController.deleteRegistration);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/validate`)
    .post(secureSecretaryController.validateRegistration);

  secretaryRouter.route(`/registrations/:entity(${entities})/:id/documents/:doc`)
    .post(upload.single("file"), secureSecretaryController.uploadDocument);
  secretaryRouter.route(`/registrations/:entity(${entities})/:id/documents/:doc/:action(template|download)`)
    .get(secureSecretaryController.downloadDocument);

  secretaryRouter.route(`/data/:entity(${entities})`)
    .get(secureSecretaryController.getData);

  app.use("/sg", hasHRCredentials, secretaryRouter);
}
