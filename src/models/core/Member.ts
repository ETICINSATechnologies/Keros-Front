import { Gender } from "../core/Gender";
import { Department } from "./Department";
import { Address } from "./Address";
import { Position } from "./Position";

export class Member {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private username ?: string,
    private gender ?: Gender,
    private email ?: string,
    private birthday ?: string,
    private department ?: Department,
    private schoolYear ?: number,
    private telephone ?: string,
    private address ?: Address,
    private positions ?: Position[],
  ) {
  }

}