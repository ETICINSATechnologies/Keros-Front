import winston from "winston";
import { Request, Response, NextFunction } from "express";

import { HttpError } from "../app/common/models";

export const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction): void => {
  winston.error(err.stack);
  res.status(err.status).render("common/error", {
    error: err
  });
};
