import { Router } from "express";
import * as winston from "winston";
import { ConsultantInscriptionController } from "./ConsultantInscriptionController";
import { secureRouter } from "../secureRouter";

/**
 * Router for memberInscription for /sg/consultant-inscription**
 * @returns {e.Router}
 */

export function consultantInscriptionRouter(): Router {
    winston.debug("Mapping MemberInscriptions routes");
    const inscriptionController: ConsultantInscriptionController = new ConsultantInscriptionController();
    const router: Router = Router();
    secureRouter(router);

    router.get("", inscriptionController.viewConsultantInscriptions);
    router.get("/:id(\\d+)/", inscriptionController.viewConsultantInscription);
    router.get("/create", inscriptionController.createConsultantInscription);
    router.get("/update/:id(\\d+)/", inscriptionController.updateConsultantInscription);
    router.get("/delete/:id(\\d+)/", inscriptionController.deleteConsultantInscription);
    router.get("/:id(\\d+)/document/:documentTypeId(\\d+)/", inscriptionController.downloadDocument);
    router.get("/:id(\\d+)/document/:documentTypeId(\\d+)/generate", inscriptionController.generateDocument);
    router.post("postform", inscriptionController.postConsultantInscriptionForm);
    router.post("/:id(\\d+)/document/:documentTypeId(\\d+)/", inscriptionController.uploadDocument);

    return router;
}