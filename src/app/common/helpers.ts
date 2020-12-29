import { Request, Response, NextFunction } from "express";

import { HttpError } from "../../utils";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export function secureController(controller: any) {
  for (const prop in Object.getOwnPropertyDescriptors(controller)) {
    if (typeof controller[prop] === "function") {
      const routeHandler = controller[prop].bind({});
      controller[prop] = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await routeHandler(req, res, next);
        } catch (err) {
          next(new HttpError(err.status || 500, err.message || "Unexpected Error"));
        }
      };
    }
  }
  return controller;
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
