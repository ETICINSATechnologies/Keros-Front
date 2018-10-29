import { IStringable } from "../interface/IStringable";

export class Address implements IStringable {
  constructor(
    private id ?: number,
    private line1 ?: string,
    private line2 ?: string,
    private postalCode ?: string,
    private city ?: string,
    private countryId ?: number,
  ) {
  }

  toString(): string {
    return this.line1 + ", " + this.line2 + ", " + this.postalCode + ", " + this.city;
  }
}