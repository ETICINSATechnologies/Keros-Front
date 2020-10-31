import winston from "winston";
import { Application, Router } from "express";

import { SecretaryController } from "./controllers";
import { isSecretary } from "../../utils";

export function initRoutes(app: Application) {
  winston.debug("Initializing secretary routes");
  const secretaryRouter = Router();

  secretaryRouter.route("/registrations/:entity")
    .get(SecretaryController.getSearchPage);

  secretaryRouter.route("/registrations/:entity/:id")
    .get(SecretaryController.getRegistration);

  secretaryRouter.route("/data/:entity")
    .get(SecretaryController.getData);

  app.use("/sg", isSecretary, secretaryRouter);
}
