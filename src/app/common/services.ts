import { Config } from "../../config";
import { HttpClient } from "../../utils";
import { RestAPICollection } from "./models";

export class BaseService {
  private static kerosApi: HttpClient;

  public static get api(): RestAPICollection {
    if (!BaseService.kerosApi) {
      BaseService.kerosApi = new HttpClient(Config.backendBaseUrl);
    }
    return {
      keros: BaseService.kerosApi
    };
  }
}
