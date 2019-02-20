import { Pole } from "./Pole";
import { IStringable } from "../interface/IStringable";

export class Position implements IStringable {
  constructor(
    private id ?: number,
    private label ?: string,
    public year ?: number,
    public isBoard ?: boolean,
    private pole ?: Pole,
  ) {}
  toString(): string {
    if (this.pole !== undefined) {
      return this.label + " " + this.pole.toString();
    }
    return "";
  }
}