import * as winston from "winston";
import { Router } from "express";
import { LoginController } from "./LoginController";
import { LogoutController } from "./LogoutController";

/**
 * Router for Authentication needs
 * @returns {e.Router}
 */
export function authRouter(): Router {
  winston.debug("Mapping Authentication routes");
  const loginController: LoginController = new LoginController();
  const logoutController: LogoutController = new LogoutController();
  const router: Router = Router();
  router.get("/login", loginController.viewLoginForm);
  router.post("/login", loginController.login);
  router.get("/logout", logoutController.logout);
  router.get("/forgetPassword", loginController.viewForgetPassword);
  router.post("/forgetPassword", loginController.forgetPassword);
  router.get("/reset-password", loginController.viewResetPassword);
  router.post("/reset-password", loginController.resetPassword);
  return router;
}
