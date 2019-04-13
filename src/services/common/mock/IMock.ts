import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";

/**
 * Implementing class must return a IRestResponse<T> or throw an error if the resource matches theirs.
 * If the resource path does not match, it must return null
 */
export interface IMock {
  options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null;

  get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null;

  getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null;

  del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null;

  create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null;

  update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null;
}
