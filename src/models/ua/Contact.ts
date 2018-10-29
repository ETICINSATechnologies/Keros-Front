import { Firm } from "./Firm";
import { Gender } from "../core/Gender";

export class Contact {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private gender ?: Gender,
    private firm ?: Firm,
    private email ?: string,
    private telephone ?: string,
    private cellphone ?: string,
    private position ?: string,
    private notes ?: string,
    private old ?: boolean,
  ) {}
}