import { RestClient } from "typed-rest-client/RestClient";
import HttpError from "../util/httpError";

export class BaseService {
  protected static readonly rest: RestClient = new RestClient("Keros", "http://localhost:8000/api/v1");

  protected static defaultError(): HttpError {
    return new HttpError("Erreur de connection avec le back", 500);
  }
}