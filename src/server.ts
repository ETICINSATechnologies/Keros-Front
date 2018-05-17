import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";


import * as winston from "winston";
import HttpError from "./util/httpError";
import handlebars from "./util/handlebars";
import * as http from "http";
import { Config } from "./config/config";
import { catRouter } from "./control/cat/catRouter";

/**
 * The server - contains the express server
 * @class Server
 */
export class Server {

  /**
   * The express server - base of application
   */
  public readonly app: express.Application;

  /**
   *  Creates an instance of the server with a configured express server
   * @returns {Server} A server instance containing the express server
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor - should only be called by Server.bootstrap().
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
   * @class Server
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

    this.app.use("/cat", catRouter());

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


    // Create HTTP server with app as parameter, to easily add other ports / servers if needed
    const httpServer = http.createServer(this.app);
    httpServer.listen(Config.getHttpPort(), function () {
      winston.info("Listening for HTTP requests on port " + Config.getHttpPort());
    });
  }
}
