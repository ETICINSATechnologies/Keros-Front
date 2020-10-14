import http from "http";
import path from "path";

import express, { Application, Request, Response, NextFunction } from "express";
import exphbs from "express-handlebars";
import winston from "winston";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { HttpClient, errorHandler } from "../utils";
import { Config, HBS_CONFIG } from "../config";

import { BaseService } from "./common/services";
import * as authModule from "./auth";
import * as coreModule from "./core";

export class App {
	public readonly app: Application;

	public static bootstrap(): App {
		return new App();
	}

	private constructor() {
		this.app = express();
		Config.bootstrap();
		this.configureApplication();
	}

	private configureApplication() {
		this.app.use("/public", express.static(path.join(__dirname, "../../public")));

		this.app.use("/js", express.static(path.join(__dirname, "../../node_modules/jquery/dist")));
		this.app.use("/js", express.static(path.join(__dirname, "../../node_modules/bootstrap/dist/js")));
		this.app.use("/js", express.static(path.join(__dirname, "../../node_modules/admin-lte/dist/js")));

		this.app.use("/css", express.static(path.join(__dirname, "../../node_modules/bootstrap/dist/css")));
		this.app.use("/css", express.static(path.join(__dirname, "../../node_modules/admin-lte/dist/css")));

		this.app.use("/fontawesome", express.static(path.join(__dirname, "../../node_modules/@fortawesome/fontawesome-free")));
		this.app.use("/jsgrid", express.static(path.join(__dirname, "../../node_modules/admin-lte/plugins/jsgrid")));

		this.app.engine(".hbs", exphbs(HBS_CONFIG));
		this.app.set("view engine", "hbs");

		this.app.use(bodyParser.json());

		this.app.use(bodyParser.urlencoded({
			extended: true
		}));

		this.app.use(cookieParser("156daf75-d51b-4918-a1b5-e158126b0cbd"));

		this.app.use((req: Request, res: Response, next: NextFunction) => {
			if (req.cookies.token && !BaseService.api.keros.getDefaultHeader("Authorization")) {
				winston.info("Setting authorization token found in cookie");
				BaseService.api.keros.setDefaultHeader("Authorization", req.cookies.token);
			}
			next();
		});

		authModule.initRoutes(this.app);
		coreModule.initRoutes(this.app);

		this.app.use(errorHandler);
	}

	public startServer() {
		const httpServer = http.createServer(this.app);
		httpServer.listen(Config.httpPort, function() {
			winston.info(`Listening for requests on port ${Config.httpPort}`);
		});
	}
}
