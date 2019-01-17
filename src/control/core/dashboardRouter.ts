import * as winston from "winston";
import { Router } from "express";
import { DashboardController } from "./DashboardController";
import { secureRouter } from "../secureRouter";

/**
 * Router for the dashboard endpoints**
 * @returns {e.Router}
 */

export function dashboardRouter(): Router {
  winston.debug("Mapping Dashboard routes");
  const indexController: DashboardController = new DashboardController();
  const router: Router = Router();
  secureRouter(router);

  //router.get("/dashboard", indexController.getDashboard);
  //router.get("", indexController.getDashboard);
  router.get("", indexController.viewStudiesOnDashboard);
  router.get("/dashboard", indexController.viewStudiesOnDashboard);
  return router;
}