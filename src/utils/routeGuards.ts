import { Request, Response, NextFunction } from "express";

import { Position } from "../app/core/models/Position";

import { HttpError } from "../utils";

export const isConnected = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.cookies.token || !req.cookies.connectedUser) {
    return res.redirect("/auth/login");
  }
  next();
};

export const hasHRCredentials = (req: Request, _res: Response, next: NextFunction): void => {
  const connectedUser = JSON.parse(req.cookies.connectedUser);
  if (connectedUser.positions && connectedUser.positions.some((pos: Position) => pos.id === 22 || pos.id === 19)) {
    return next();
  }
  next(new HttpError(401, "Access denied, insufficient credentials."));
};
