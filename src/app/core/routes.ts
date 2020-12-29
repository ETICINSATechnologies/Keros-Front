import winston from "winston";
import { Application, Router } from "express";

import { secureController } from "../common/helpers";

import { CoreController } from "./controllers";
import { isConnected, hasHRCredentials } from "../../utils";

const entities = ["members", "consultants", "alumni"].join("|");
const data = `${entities}|${["positions", "poles", "departments"].join("|")}`;


export function initRoutes(app: Application): void {
  winston.debug("Initializing core routes");
  const coreRouter = Router();

  const secureCoreController = secureController(CoreController);

  coreRouter.route("/")
    .get(secureCoreController.getDashboard);

  coreRouter.route("/profile/me/:action(view|modify)")
    .get(secureCoreController.getProfilePage);
  coreRouter.route("/profile/me/modify")
    .post(secureCoreController.modifyProfile);

  coreRouter.route(`/profile/:entity(${entities})/:id/:action(view|modify)`)
    .get(hasHRCredentials, secureCoreController.getProfilePage);
  coreRouter.route(`/profile/:entity(${entities})/:id/modify`)
    .post(hasHRCredentials, secureCoreController.modifyProfile);
  coreRouter.route(`/profile/:entity(${entities})/:id/delete`)
    .get(hasHRCredentials, secureCoreController.deleteProfile);

  coreRouter.route(`/search/:entity(${entities})`)
    .get(hasHRCredentials, secureCoreController.getSearchPage);
  coreRouter.route(`/search/:entity(${entities})/add`)
    .get(hasHRCredentials, secureCoreController.getProfilePage)
    .post(hasHRCredentials, secureCoreController.addProfile);

  coreRouter.route(`/data/:entity(${data})`)
    .get(secureCoreController.getData);
  coreRouter.route(`/export/:entity(${entities})`)
    .post(hasHRCredentials, secureCoreController.exportToCSV);

  app.use("", isConnected, coreRouter);
}
