import { Gender } from "../core/Gender";

export class ContactShort {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private gender ?: Gender,
    private email ?: string,
    private telephone ?: string,
    private cellphone ?: string,
    private position ?: string,
  ) {}
}