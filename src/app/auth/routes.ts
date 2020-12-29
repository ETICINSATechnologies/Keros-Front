import winston from "winston";
import { Application, Router } from "express";

import { secureController } from "../common/helpers";

import { AuthController } from "./controllers";

export function initRoutes(app: Application): void {
  winston.debug("Initializing authentication routes");
  const authRouter = Router();

  const secureAuthController = secureController(AuthController);

  authRouter.route("/login")
    .get(secureAuthController.viewLoginPage)
    .post(secureAuthController.login);

  authRouter.route("/logout")
    .get(secureAuthController.logout);

  app.use("/auth", authRouter);
}
