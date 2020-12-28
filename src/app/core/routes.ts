import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected, isSecretary } from "../../utils";

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
    .get(isSecretary, CoreController.getProfilePage);
  coreRouter.route(`/profile/:entity(${entities})/:id/modify`)
    .post(isSecretary, CoreController.modifyProfile);
  coreRouter.route(`/profile/:entity(${entities})/:id/delete`)
    .get(isSecretary, CoreController.deleteProfile);

  coreRouter.route(`/search/:entity(${entities})`)
    .get(isSecretary, CoreController.getSearchPage);
  coreRouter.route(`/search/:entity(${entities})/add`)
    .get(isSecretary, CoreController.getProfilePage)
    .post(isSecretary, CoreController.addProfile);

  coreRouter.route(`/data/:entity(${data})`)
    .get(CoreController.getData);
  coreRouter.route(`/export/:entity(${entities})`)
    .post(isSecretary, CoreController.exportToCSV);

  app.use("", isConnected, coreRouter);
}
