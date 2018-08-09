import * as winston from "winston";
import { Router } from "express";
import { StudyController } from "./studyController";
import { secureRouter } from "../secureRouter";

/**
 * Router for study for /ua/study/**
 * @returns {e.Router}
 */

export function studyRouter(): Router {
  winston.debug("Mapping Studies routes");
  const studyController: StudyController = new StudyController();
  const router: Router = Router();
  secureRouter(router);

  router.get("", studyController.viewStudies);
  router.get("/:id(\\d+)/", studyController.viewStudy);
  router.get("/inscription", studyController.viewStudyForm);
  router.post("/create", studyController.postStudyForm);
  router.get("/update/:id(\\d+)/", studyController.viewStudyForm);
  router.post("/update", studyController.postStudyForm);

  return router;
}