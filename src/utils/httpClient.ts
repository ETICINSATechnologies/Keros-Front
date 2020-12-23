import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import winston from "winston";

import { HttpError } from "./httpPayload";

export class HttpClient {
  private restClient: AxiosInstance;

  constructor(baseURL = "") {
    this.restClient = axios.create({ baseURL });
  }

  getDefaultHeader(key: string): string {
    return this.restClient.defaults.headers.common[key];
  }

  setDefaultHeader(key: string, value: string): void {
    this.restClient.defaults.headers.common[key] = value;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  async get<T>(resource: string, options?: AxiosRequestConfig): Promise<T> {
    winston.debug(`GET ${resource}`);
    return this.restClient.get<T>(resource, options)
      .then((res: AxiosResponse<T>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new HttpError(err.response.status, err.response.data.message);
        }
        throw new HttpError(500, "Unexpected Error");
      });
  }

  async post<T>(resource: string, body: any, options?: AxiosRequestConfig): Promise<T> {
    winston.debug(`POST ${resource} with : \n ${JSON.stringify(body, null, 2)}`);
    return this.restClient.post<T>(resource, body, options)
      .then((res: AxiosResponse<T>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new HttpError(err.response.status, err.response.data.message);
        }
        throw new HttpError(500, "Unexpected Error");
      });
  }

  async put<T>(resource: string, body: any, options?: AxiosRequestConfig): Promise<T> {
    winston.debug(`PUT ${resource} with : \n ${JSON.stringify(body, null, 2)}`);
    return this.restClient.put<T>(resource, body, options)
      .then((res: AxiosResponse<T>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new HttpError(err.response.status, err.response.data.message);
        }
        throw new HttpError(500, "Unexpected Error");
      });
  }

  async delete<T>(resource: string, options?: AxiosRequestConfig): Promise<T> {
    winston.debug(`DELETE ${resource}`);
    return this.restClient.delete<T>(resource, options)
      .then((res: AxiosResponse<T>) => {
        winston.debug(`Response : ${res.statusText}`);
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new HttpError(err.response.status, err.response.data.message);
        }
        throw new HttpError(500, "Unexpected Error");
      });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
}
