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

  router.get("", memberController.viewMembers);
  router.get("/:id(\\d+)/", memberController.viewMember);
  router.get("/signin", memberController.viewMemberForm);
  router.post("/create", memberController.postMemberForm);
  router.get("/update/:id(\\d+)/", memberController.viewMember);

  return router;
}