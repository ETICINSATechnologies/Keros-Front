import * as winston from "winston";
import { Router } from "express";
import { MemberController } from "./MemberController";
import { secureRouter } from "../secureRouter";

/**
 * Router for core endpoints*
 * @returns {e.Router}
 */

export function coreRouter(): Router {
  winston.debug("Mapping Core routes");
  const memberController: MemberController = new MemberController();
  const router: Router = Router();
  secureRouter(router);

  router.get("/member", memberController.viewMembers);
  router.get("/member/:id(\\d+)/", memberController.viewMember);
  router.get("/member/create", memberController.viewMemberForm);
  router.post("/member/createform", memberController.postMemberForm);
  router.get("/member/update/:id(\\d+)/", memberController.viewMember);

  return router;
}