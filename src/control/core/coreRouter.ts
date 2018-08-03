import * as winston from "winston";
import { Router } from "express";
import { MemberController } from "./memberController";

/**
 * Router for members for /member/**
 * @returns {e.Router}
 */

export function coreRouter(): Router {
    winston.debug("Mapping Members routes");
    const memberController: MemberController = new MemberController();
    const router: Router = Router();

    router.get("", memberController.viewMembers);
    router.get("/:id(\\d+)/", memberController.viewMember);
    router.get("/signin", memberController.viewMemberForm);
    router.post("/create", memberController.postMemberForm);
    router.get("/update/:id(\\d+)/", memberController.viewMemberForm);

    return router;
}