import { Meta } from "./Meta";

export class Page<T> {
  constructor(
    public content ?: T[],
    public meta ?: Meta,
  ) {
  }
}