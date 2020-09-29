import winston from "winston";
import { Application, Router } from "express";

import { AuthController } from "./controllers";

export function initRoutes(app: Application) {
	winston.debug("Initializing authentication routes");
	const authRouter = Router();

	authRouter.get("/login", AuthController.viewLoginPage);
	authRouter.post("/login", AuthController.login);

	authRouter.post("/logout", AuthController.logout);
	app.use("/auth", authRouter);
}
