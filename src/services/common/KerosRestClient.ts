import { IClient } from "./BaseService";
import { IRequestOptions, IRestResponse, RestClient } from "typed-rest-client/RestClient";

export class KerosRestClient implements IClient {
  private restClient: RestClient;

  constructor(baseUrl: string) {
    this.restClient = new RestClient("Keros", baseUrl);
  }

  create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return this.restClient.create<T>(resource, resources, options);
  }

  del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return this.restClient.del<T>(resource, options);
  }

  get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return this.restClient.get<T>(resource, options);
  }

  getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>> {
    return this.restClient.get<T[]>(resource, options);
  }

  options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return this.restClient.options<T>(requestUrl, options);
  }

  update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return this.restClient.create<T>(resource, resources, options);
  }
}