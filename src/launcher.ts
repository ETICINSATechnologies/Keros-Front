import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";


import * as winston from "winston";
import HttpError from "./util/httpError";
import handlebars from "./util/handlebars";
import * as http from "http";
import { Config } from "./config/Config";
import { authRouter } from "./control/auth/authRouter";
import { coreRouter } from "./control/core/coreRouter";
import { firmRouter } from "./control/ua/firmRouter";
import { studyRouter } from "./control/ua/studyRouter";
import { dashboardRouter } from "./control/core/dashboardRouter";

/**
 * The Launcher - contains the express Application as well as methods to launch a server on that
 * application. Entrypoint for the Keros Application
 * @class Launcher
 */
export class Launcher {

  /**
   * The express server - base of application
   */
  public readonly app: express.Application;

  /**
   *  Creates an instance of the launcher with a configured express app
   * @returns {Launcher} A launcher instance
   */
  public static bootstrap(): Launcher {
    return new Launcher();
  }

  /**
   * Constructor - should only be called by Launcher.bootstrap().
   */
  private constructor() {
    winston.debug("Creating server object");
    this.app = express();
    Config.bootstrap();
    this.configureApplication();
  }


  /**
   * Configure application, including routes, engines, middleware
   * and error handling
   * @class Launcher
   */
  public configureApplication() {
    // Add static paths
    this.app.use("/public", express.static(path.join(__dirname, "../public")));

    // view engine setup
    this.app.engine(".hbs", handlebars);
    this.app.set("view engine", "hbs");


    // Mount json form parser
    this.app.use(bodyParser.json());

    // Mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // mount cookie parser middleware
    this.app.use(cookieParser("156daf75-d51b-4918-a1b5-e158126b0cbd"));

    this.app.use("/auth", authRouter());
    this.app.use("", dashboardRouter());
    this.app.use("/core/member", coreRouter());
    this.app.use("/ua/firm", firmRouter());
    this.app.use("/ua/study", studyRouter());

    // Catch 404 and forward to error handler
    this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
      const err: any = new HttpError("Cette page n'existe pas", 404);
      next(err);
    });

    // Handle any errors
    this.app.use(function (err: any, req: any, res: any, next: any) {
      res.status(err.status || 500);
      res.render("error", {
        error: err
      });
    });
  }

  /**
   * Starts a HTTP server to listen for requests, using the bootstrapped app.
   */
  public startServer() {
    // Create HTTP server with app as parameter, to easily add other ports / servers if needed
    const httpServer = http.createServer(this.app);
    httpServer.listen(Config.getHttpPort(), function () {
      winston.info("Listening for HTTP requests on port " + Config.getHttpPort());
    });
  }
}
