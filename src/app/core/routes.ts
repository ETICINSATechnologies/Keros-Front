import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected, isSecretary } from "../../utils";

export function initRoutes(app: Application) {
  winston.debug("Initializing core routes");
  const coreRouter = Router();

  coreRouter.route("/")
    .get(CoreController.getDashboard);

  coreRouter.route("/profile/me")
    .get(CoreController.getProfile);
  coreRouter.route("/profile/me/modify")
    .get(CoreController.enableModifyProfile)
    .post(CoreController.modifyCurrentProfile);

  coreRouter.route("/profile/:entity/:id")
    .get(CoreController.getProfile);
  coreRouter.route("/profile/:entity/:id/modify")
    .get(CoreController.enableModifyProfile)
    .post(isSecretary, CoreController.modifyProfile);

  coreRouter.route("/search/:entity")
    .get(CoreController.getSearchPage);

  coreRouter.route("/data/:entity")
    .get(CoreController.getData);

  app.use("", isConnected, coreRouter);
}
