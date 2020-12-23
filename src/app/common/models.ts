import { HttpClient } from "../../utils";
export { HttpResponse, HttpError } from "../../utils";

export interface RestAPICollection {
  [key: string]: HttpClient
}

export interface Timestamp {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface DocumentResponse {
  location: string;
}

export interface SearchResponse<T> {
  content: T[];
  meta: {
    page: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
