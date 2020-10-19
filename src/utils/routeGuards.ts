import { Request, Response, NextFunction } from "express";

export const isConnected = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token || !req.cookies.connectedUser) {
      return res.redirect("/auth/login");
  }
  next();
};

export const isSecretary = (req: Request, res: Response, next: NextFunction) => {
  const connectedUser = JSON.parse(req.cookies.connectedUser);
  if (connectedUser.positions && connectedUser.positions.some((pos: any) => pos.id === 22)) {
    next();
  }
};
