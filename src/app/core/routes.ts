import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected, hasHRCredentials } from "../../utils";

const entities = ["members", "consultants", "alumni"].join("|");
const data = `${entities}|${["positions", "poles", "departments"].join("|")}`;

export function initRoutes(app: Application): void {
  winston.debug("Initializing core routes");
  const coreRouter = Router();

  coreRouter.route("/")
    .get(CoreController.getDashboard);

  coreRouter.route("/profile/me/:action(view|modify)")
    .get(CoreController.getProfilePage);
  coreRouter.route("/profile/me/modify")
    .post(CoreController.modifyProfile);

  coreRouter.route(`/profile/:entity(${entities})/:id/:action(view|modify)`)
    .get(hasHRCredentials, CoreController.getProfilePage);
  coreRouter.route(`/profile/:entity(${entities})/:id/modify`)
    .post(hasHRCredentials, CoreController.modifyProfile);
  coreRouter.route(`/profile/:entity(${entities})/:id/delete`)
    .get(hasHRCredentials, CoreController.deleteProfile);

  coreRouter.route(`/search/:entity(${entities})`)
    .get(hasHRCredentials, CoreController.getSearchPage);
  coreRouter.route(`/search/:entity(${entities})/add`)
    .get(hasHRCredentials, CoreController.getProfilePage)
    .post(hasHRCredentials, CoreController.addProfile);

  coreRouter.route(`/data/:entity(${data})`)
    .get(CoreController.getData);
  coreRouter.route(`/export/:entity(${entities})`)
    .post(hasHRCredentials, CoreController.exportToCSV);

  app.use("", isConnected, coreRouter);
}
