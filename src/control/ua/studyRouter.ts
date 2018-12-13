import * as winston from "winston";
import { Router } from "express";
import { StudyController } from "./StudyController";
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
  router.get("/create", studyController.createStudy);
  router.get("/update/:id(\\d+)/", studyController.updateStudy);
  router.get("/delete/:id(\\d+)/", studyController.deleteStudy);
  router.post("/postform", studyController.postStudyForm);

  return router;
}