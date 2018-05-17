import * as winston from "winston";
import { Router } from "express";
import { CatController } from "./CatController";

/**
 * Router for cats for /cat/**
 * @returns {e.Router}
 */
export function catRouter(): Router {
  winston.debug("Mapping Cat routes");
  const catController: CatController = new CatController();
  const router: Router = Router();

  router.get("", catController.viewCats);

  return router;
}