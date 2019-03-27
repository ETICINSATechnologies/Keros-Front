import * as winston from "winston";
import { Router } from "express";
import { secureRouter } from "../secureRouter";
import { BulletinVersementController } from "./BulletinVersementController";

/**
 * Router for BV for /treso/payment-slip
 * @returns {e.Router}
 */

export function bulletinVersementRouter(): Router {
  winston.debug("Mapping BV routes");
  const bulletinVersementController: BulletinVersementController = new BulletinVersementController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", bulletinVersementController.viewBulletinsVersement);
  router.get("/:id(\\d+)/", bulletinVersementController.viewBulletinVersement);
  router.get("/create", bulletinVersementController.createBulletinVersement);
  router.get("/update/:id(\\d+)/", bulletinVersementController.updateBulletinVersement);
  router.get("/delete/:id(\\d+)/", bulletinVersementController.deleteBulletinVersement);
  router.post("/postform", bulletinVersementController.postBulletinVersementForm);
  router.post("/:id(\\d+)/validate-ua", bulletinVersementController.validateUa);
  router.post("/:id(\\d+)/validate-perf", bulletinVersementController.validatePerf);

  return router;
}