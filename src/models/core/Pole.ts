import { IStringable } from "../interface/IStringable";

export class Pole implements IStringable{
  constructor(
    public id ?: number,
    private label ?: string,
    private name ?: string,
  ) {}
  toString(): string {
    return "(" + this.label + ")";
  }
}