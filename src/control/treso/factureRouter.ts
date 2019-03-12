import * as winston from "winston";
import { Router } from "express";
import { secureRouter } from "../secureRouter";
import { FactureController } from "./FactureController";

/**
 * Router for facture for /treso/facture
 * @returns {e.Router}
 */

export function factureRouter(): Router {
  winston.debug("Mapping Factures routes");
  const factureController: FactureController = new FactureController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", factureController.viewFactures);
  router.get("/:id(\\d+)/", factureController.viewFacture);
  router.get("/create", factureController.createFacture);
  router.get("/update/:id(\\d+)/", factureController.updateFacture);
  router.get("/delete/:id(\\d+)/", factureController.deleteFacture);
  router.post("/postform", factureController.postFactureForm);
  router.post("/:id(\\d+)/validate-ua", factureController.validateUa);
  router.post("/:id(\\d+)/validate-perf", factureController.validatePerf);
  router.get("/:id(\\d+)/generateDocument", factureController.getDocument);

  return router;
}