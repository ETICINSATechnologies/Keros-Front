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

  public viewCatForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create cat form");
    res.render("cat/createForm");
  }

  public viewCat(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Getting cat form for id " + id);
    CatService.getCat(id, function (err, cat: Cat | null) {
      if (err) {
        return next(err);
      }

      const options = {
        cat: cat
      };

      // On peut passer un objet directement si c'est assez facile à lire / comprendre
      res.render("cat/viewCat", options);
    });
  }

  public postCatForm(req: Request, res: Response, next: NextFunction) {
    let name = req.body.name;
    let height = req.body.height;
    let cat = new Cat(undefined, name, height);
    CatService.createCat(cat, function(err){
      if (err) {
        return next(err);
      }
      res.redirect("/cat")
    });
  }
}