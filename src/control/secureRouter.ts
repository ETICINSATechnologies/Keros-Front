import {NextFunction, Request, Response, Router} from "express";
import * as httpContext from "express-http-context";

/**
 * Function that secures a router. Adds a check to make sure
 * that the user is connected.
 * Note that it must be called before the secured routes
 * @param {e.Router} router the router to secure
 */
export function secureRouter(router: Router): void {
  router.use(function (req: Request, res: Response, next: NextFunction) {

    if (!req.cookies.token || !req.cookies.connectedUser) {
      return res.redirect("/auth/login");
    }

    // Add user information to locals for templating
    let connectedUser = req.cookies.connectedUser;
    res.locals.connectedUser = JSON.parse(connectedUser);
    httpContext.set('token', req.cookies.token);
    httpContext.set('connectedUser', res.locals.connectedUser);

    next();
  });
}