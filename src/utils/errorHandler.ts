import winston from "winston";
import { Request, Response, NextFunction } from "express";

import { HttpError } from "../app/common/models";

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  winston.error(err.stack);
  res.status(err.status).render("common/error", {
    error: err
  });
};
