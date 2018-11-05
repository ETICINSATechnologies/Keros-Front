import { Pole } from "./Pole";

export class Position {
  constructor(
    private id ?: number,
    private label ?: string,
    private pole ?: Pole,
  ) {}
  toString(): string {
    if (this.pole !== undefined) {
      return this.label + " " + this.pole.toString();
    }
    return "";
  }
}