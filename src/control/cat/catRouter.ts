import * as winston from "winston";
import { Router } from "express";
import { CatController } from "./CatController";
import { secureRouter } from "../secureRouter";

/**
 * Secured router for cats for /cat/**
 * @returns {e.Router}
 */
export function catRouter(): Router {
  winston.debug("Mapping Cat routes");
  const catController: CatController = new CatController();
  const router: Router = Router();

  secureRouter(router);

  router.get("", catController.viewCats);
  // Que les routes en chat/{id} avec id un nombre (c'est un regex)
  router.get("/:id(\\d+)/", catController.viewCat);
  router.get("/create", catController.viewCatForm);
  router.post("/create", catController.postCatForm);

  return router;
}