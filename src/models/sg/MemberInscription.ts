import { IStringable } from "../interface/IStringable";
import { Department } from "../core/Department";
import { Country } from "../core/Country";
import { Pole } from "../core/Pole";
import { Address } from "../core/Address";
import { Document } from "../Document";
import { Gender } from "../core/Gender";

export class MemberInscription implements IStringable {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private department ?: Department,
    private email ?: string,
    private gender ?: Gender,
    private birthday ?: string,
    private phoneNumber ?: string,
    private outYear ?: number,
    private nationality ?: Country,
    private wantedPole ?: Pole,
    private address ?: Address,
    private documents ?: Document [],
    private hasPaid ?: boolean,
    private droitImage ?: boolean
  ) {}
}
