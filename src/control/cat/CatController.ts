import { NextFunction, Request, Response } from "express";
import { CatService } from "../../services/cat/CatService";
import { Cat } from "../../models/cat/Cat";
import * as winston from "winston";

export class CatController {

  public viewCats(req: Request, res: Response, next: NextFunction) {
    CatService.getAllCats(function (err, cats: Cat [] | null) {
      winston.info("Getting all cats");
      if (err) {
        return next(err);
      }

      const options = {
        cats: cats
      };

      res.render("cat/viewAll", options);
    });
  }
}