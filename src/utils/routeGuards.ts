import { Request, Response, NextFunction } from "express";

export const isConnected = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token || !req.cookies.connectedUser) {
      return res.redirect("/auth/login");
  }
  next();
};
