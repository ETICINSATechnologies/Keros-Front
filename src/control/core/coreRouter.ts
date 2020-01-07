import * as winston from "winston";
import { Router } from "express";
import { MemberController } from "./MemberController";
import { ConsultantController } from "./ConsultantController";
import { secureRouter } from "../secureRouter";

/**
 * Router for core endpoints*
 * @returns {e.Router}
 */

export function coreRouter(): Router {
  winston.debug("Mapping Core routes");
  const memberController: MemberController = new MemberController();
  const consultantController: ConsultantController = new ConsultantController();
  const router: Router = Router();
  secureRouter(router);
  // members
  router.get("/member", memberController.viewMembers);
  router.get("/member/:id(\\d+)/", memberController.viewMember);
  router.get("/member/create", memberController.createMember);
  router.get("/member/update/:id(\\d+)/", memberController.updateMember);
  router.post("/member/postform", memberController.postMemberForm);
  router.get("/member/me", memberController.viewProfile);
  router.get("/member/me/update", memberController.updateProfile);
  router.get("/member/delete/:id(\\d+)/", memberController.deleteMember);
  router.get("/member/json", memberController.getJSONMembers);
  router.get("/member?orderBy=username", memberController.viewMembersByUsername);

  // consultants
  router.get("/consultant", consultantController.viewConsultants);
  router.get("/consultant/:id(\\d+)/", consultantController.viewConsultant);
  router.get("/consultant/create", consultantController.createConsultant);
  router.get("/consultant/update/:id(\\d+)/", consultantController.updateConsultant);
  router.post("/consultant/postform", consultantController.postConsultantForm);
  router.get("/consultant/me", consultantController.viewProfile);
  router.get("/consultant/me/update", consultantController.updateProfile);
  router.get("/consultant/delete/:id(\\d+)/", consultantController.deleteConsultant);
  router.get("/consultant/json", consultantController.getJSONConsultants);
  return router;
}
