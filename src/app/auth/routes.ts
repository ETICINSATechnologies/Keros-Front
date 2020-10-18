import winston from "winston";
import { Application, Router } from "express";

import { AuthController } from "./controllers";

export function initRoutes(app: Application) {
  winston.debug("Initializing authentication routes");
  const authRouter = Router();

  authRouter.route("/login")
    .get(AuthController.viewLoginPage)
    .post(AuthController.login);

  authRouter.route("/logout")
    .get(AuthController.logout);

  app.use("/auth", authRouter);
}
