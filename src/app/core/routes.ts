import winston from "winston";
import { Application, Router } from "express";

import { CoreController } from "./controllers";
import { isConnected } from "../../utils";

export function initRoutes(app: Application) {
	winston.debug("Initializing core routes");
	const coreRouter = Router();

	coreRouter.route("/")
		.get(CoreController.getDashboard);

	coreRouter.route("/profile/me")
		.get(CoreController.getConnectedProfile);

	coreRouter.route("/profile/me/modify")
		.get(CoreController.enableModifyProfile)
		.post(CoreController.modifyProfile);

	coreRouter.route("/search/members")
		.get(CoreController.getSearchPage);

	coreRouter.route("/data/:entity")
		.get(CoreController.getData);

	app.use("", isConnected, coreRouter);
}
