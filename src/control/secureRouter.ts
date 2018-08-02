import { NextFunction, Request, Response, Router } from "express";

/**
 * Function that secures a router. Adds a check to make sure
 * that the user is connected.
 * Note that it must be called before the secured routes
 * @param {e.Router} router the router to secure
 */
export function secureRouter(router: Router): void {
  router.use(function (req: Request, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      return res.redirect("/auth/login");
    }
    next();
  });
}