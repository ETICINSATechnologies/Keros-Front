import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected } from "../../utils";

export function initRoutes(app: Application) {
	winston.debug("Initializing core routes");
	const coreRouter = Router();

	coreRouter.route("/")
		.get(isConnected, CoreController.getDashboard);
	
	coreRouter.route("/profile/me")
		.get(isConnected, CoreController.getConnectedProfile);

	app.use("", coreRouter);
}
