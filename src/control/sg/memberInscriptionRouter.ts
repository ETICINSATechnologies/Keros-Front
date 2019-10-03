import { Router } from "express";
import * as winston from "winston";
import { MemberInscriptionController } from "./MemberInscriptionController";
import { secureRouter } from "../secureRouter";

/**
 * Router for memberInscription for /sg/membre-inscription**
 * @returns {e.Router}
 */

export function memberInscriptionRouter(): Router {
  winston.debug("Mapping MemberInscriptions routes");
  const inscriptionController: MemberInscriptionController = new MemberInscriptionController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", inscriptionController.viewMemberInscriptions);
  router.get("/:id(\\d+)/", inscriptionController.viewMemberInscription);
  router.get("/create", inscriptionController.createMemberInscription);
  router.get("/update/:id(\\d+)/", inscriptionController.updateMemberInscription);
  router.get("/delete/:id(\\d+)/", inscriptionController.deleteMemberInscription);
  router.get("/:id(\\d+)/document/:documentTypeId(\\d+)/", inscriptionController.downloadDocument);
  router.get("/:id(\\d+)/document/:documentTypeId(\\d+)/generate", inscriptionController.generateDocument);
  router.post("/postform", inscriptionController.postMemberInscriptionForm);
  router.post("/:id(\\d+)/document/:documentTypeId(\\d+)/", inscriptionController.uploadDocument);
  router.post("/:id(\\d+)/validate", inscriptionController.validateMemberInscription);

  return router;
}
