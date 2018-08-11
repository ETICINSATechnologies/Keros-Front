import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import HttpError from "../../util/httpError";
import { Config } from "../../config/config";
import { KerosRestClient } from "./KerosRestClient";
import { MockClient } from "./mock/MockClient";

export interface IClient {
  options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>>;

  del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>>;

  update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>>;
}

export class BaseService {
  protected static readonly rest: IClient =
    function () {
      Config.bootstrap();
      if (Config.getUseMock()) {
        return new MockClient();
      }
      return new KerosRestClient("http://localhost:8000/api/v1");
    }();

  protected static defaultError(): HttpError {
    return new HttpError("Erreur de connection avec le back", 500);
  }
}