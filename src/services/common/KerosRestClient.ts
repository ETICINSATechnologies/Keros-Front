import { IClient } from "./BaseService";
import { IRequestOptions, IRestResponse, RestClient } from "typed-rest-client/RestClient";
import * as winston from "winston";

export class KerosRestClient implements IClient {
  private restClient: RestClient;

  constructor(baseUrl: string) {
    this.restClient = new RestClient("Keros", baseUrl);
  }

  create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("CREATE " + resource + " with body : " + JSON.stringify(resources));
    return this.restClient.create<T>(resource, resources, options);
  }

  del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("DELETE " + resource);
    return this.restClient.del<T>(resource, options);
  }

  get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("GET " + resource);
    return this.restClient.get<T>(resource, options);
  }

  // Custom call type to have array as response
  getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>> {
    winston.debug("GET ALL " + resource);
    return this.restClient.get<T[]>(resource, options);
  }

  options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("OPTIONS " + requestUrl);
    return this.restClient.options<T>(requestUrl, options);
  }

  // Replace "update" (PATCH) with "replace" (PUT)
  update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("UPDATE " + resource + " with body : " + JSON.stringify(resources));
    return this.restClient.replace<T>(resource, resources, options);
  }

  uploadStream<T>(verb: string, requestUrl: string, stream: NodeJS.ReadableStream, options?: IRequestOptions): Promise<IRestResponse<T>> {
    winston.debug("UPLOAD STREAM at " + requestUrl);
    return this.restClient.uploadStream<T>(verb, requestUrl, stream, options);
  }
}
