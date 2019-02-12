import { NextFunction, Request, Response } from 'express';
import * as request from 'request';
import HttpError from '../../util/httpError';
import * as httpContext from 'express-http-context';
import { BaseService } from '../../services/common/BaseService';
import * as winston from 'winston';

export class AuthenticateBackendController {
  public authenticateBackend(req: Request, res: Response, next: NextFunction) {
    let backendUri: string = req.query.backendUrl;
    if(!backendUri){
      next(new HttpError("Backend URL is not valid", 400));
      return;
    }

    request.get({
      uri: backendUri,
      headers: BaseService.defaultHeaders().additionalHeaders
    }, (error: any, response: request.Response, body: any) => {
      if(error){
        next(error);
        return;
      }
      res.redirect(JSON.parse(body).location);
    });
  }
}
