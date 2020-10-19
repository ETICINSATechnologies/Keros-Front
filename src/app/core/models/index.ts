export * from "./Address";
export * from "./Consultant";
export * from "./Country";
export * from "./Department";
export * from "./Gender";
export * from "./Member";
export * from "./Pole";
export * from "./Position";

export interface SearchResponse<T> {
  content: T[];
  meta: {
    page: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
