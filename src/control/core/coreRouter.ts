import * as winston from "winston";
import { Router } from "express";
import { MemberController } from "./MemberController";
import { secureRouter } from "../secureRouter";
import { AuthenticateBackendController } from './AuthenticateBackendController';

/**
 * Router for core endpoints*
 * @returns {e.Router}
 */

export function coreRouter(): Router {
  winston.debug("Mapping Core routes");
  const memberController: MemberController = new MemberController();
  const authenticateBackendController: AuthenticateBackendController = new AuthenticateBackendController();
  const router: Router = Router();
  secureRouter(router);

  router.get("/member", memberController.viewMembers);
  router.get("/member/:id(\\d+)/", memberController.viewMember);
  router.get("/member/create", memberController.createMember);
  router.get("/member/update/:id(\\d+)/", memberController.updateMember);
  router.post("/member/postform", memberController.postMemberForm);
  router.get("/member/me", memberController.viewProfile);
  router.get("/member/delete/:id(\\d+)/", memberController.deleteMember);
  router.get("/member/json", memberController.getJSONMembers);
  router.get("/authenticate-backend", authenticateBackendController.authenticateBackend);
  return router;
}