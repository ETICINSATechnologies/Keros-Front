import { NextFunction, Request, Response } from 'express';
import * as request from 'request';
import HttpError from '../../util/httpError';

export class AuthenticateBackendController {
  public authenticateBackend(req: Request, res: Response, next: NextFunction) {
    let backendUri: string = req.query.backendUrl;
    if(!backendUri){
      next(new HttpError("Backend URL is not valid", 400));
      return;
    }

    request.get({
      uri: backendUri
    }, (error: any, response: request.Response, body: any) => {
      if(error){
        next(error);
        return;
      }
      res.redirect(body.location);
    });
  }
}
