import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected, isSecretary } from "../../utils";

const entities = ["members", "consultants", "alumni"];
const data = [...entities, "positions", "poles", "departments"];

export function initRoutes(app: Application) {
  winston.debug("Initializing core routes");
  const coreRouter = Router();

  coreRouter.route("/")
    .get(CoreController.getDashboard);

  coreRouter.route("/profile/me/:action(view|modify)")
    .get(CoreController.getProfilePage);
  coreRouter.route("/profile/me/modify")
    .post(CoreController.modifyProfile);

  coreRouter.route(`/profile/:entity(${entities.join("|")})/:id/:action(view|modify)`)
    .get(CoreController.getProfilePage);
  coreRouter.route(`/profile/:entity(${entities.join("|")})/:id/modify`)
    .post(isSecretary, CoreController.modifyProfile);

  coreRouter.route(`/search/:entity(${entities.join("|")})`)
    .get(CoreController.getSearchPage);
  coreRouter.route(`/search/:entity(${entities.join("|")})/add`)
    .get(CoreController.getProfilePage)
    .post(CoreController.addProfile);

  coreRouter.route(`/data/:entity(${data.join("|")})`)
    .get(CoreController.getData);
  coreRouter.route(`/export/:entity(${entities.join("|")})`)
    .post(CoreController.exportToCSV);

  app.use("", isConnected, coreRouter);
}
