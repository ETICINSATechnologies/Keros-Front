import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import winston from "winston";

export type HttpResponse<T> = AxiosResponse<T>;

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class HttpClient {
  private restClient: AxiosInstance;

  constructor(baseURL = "") {
    this.restClient = axios.create({ baseURL });
  }

  getDefaultHeader(key: string) {
    return this.restClient.defaults.headers.common[key];
  }

  setDefaultHeader(key: string, value: string) {
    this.restClient.defaults.headers.common[key] = value;
  }

  get<T>(resource: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    winston.debug(`GET ${resource}`);
    return this.restClient.get<T>(resource, options).catch((err: AxiosError) => {
      if (err.response) {
        throw new HttpError(err.response.status, err.response.data.message);
      }
      throw new HttpError(500, "Unexpected Error");
    });
  }

  post<T>(resource: string, body: object, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    winston.debug(`POST ${resource} with : \n ${JSON.stringify(body, null, 2)}`);
    return this.restClient.post<T>(resource, body, options).catch((err: AxiosError) => {
      if (err.response) {
        throw new HttpError(err.response.status, err.response.data.message);
      }
      throw new HttpError(500, "Unexpected Error");
    });
  }

  put<T>(resource: string, body: object, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    winston.debug(`PUT ${resource} with : \n ${JSON.stringify(body, null, 2)}`);
    return this.restClient.put<T>(resource, body, options).catch((err: AxiosError) => {
      if (err.response) {
        throw new HttpError(err.response.status, err.response.data.message);
      }
      throw new HttpError(500, "Unexpected Error");
    });
  }
}
