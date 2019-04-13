import { Gender } from "../core/Gender";
import { Department } from "./Department";
import { Address } from "./Address";
import { Position } from "./Position";
import { IStringable } from "../interface/IStringable";

export class Member implements IStringable {
  constructor(
    public id ?: number,
    public firstName ?: string,
    public lastName ?: string,
    public username ?: string,
    public gender ?: Gender,
    public email ?: string,
    public birthday ?: string,
    public department ?: Department,
    public schoolYear ?: number,
    public telephone ?: string,
    public address ?: Address,
    public positions ?: Position[],
  ) {
  }

  toString(): string {
      return this.firstName + " " + this.lastName;
  }
}