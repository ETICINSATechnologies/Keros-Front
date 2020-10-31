export { HttpResponse, HttpError } from "../../utils";

export interface DocumentResponse {
  location?: string;
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
