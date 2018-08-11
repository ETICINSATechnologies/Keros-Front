import * as winston from "winston";
import { Router } from "express";
import { FirmController } from "./firmController";
import { secureRouter } from "../secureRouter";

/**
 * Router for members for /firm/**
 * @returns {e.Router}
 */

export function firmRouter(): Router {
  winston.debug("Mapping Firms routes");
  const firmController: FirmController = new FirmController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", firmController.viewFirms);
  router.get("/:id(\\d+)/", firmController.viewFirm);
  router.get("/create", firmController.viewFirmForm);
  router.post("/create", firmController.postFirmForm);
  router.get("/update/:id(\\d+)/", firmController.viewFirmForm);
  router.post("/update", firmController.postFirmForm);

  return router;
}