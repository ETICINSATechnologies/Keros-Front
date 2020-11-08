import { AxiosResponse } from "axios";

export type HttpResponse<T> = AxiosResponse<T>;

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
