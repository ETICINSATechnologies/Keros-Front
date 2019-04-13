import { Address } from "../core/Address";
import { FirmType } from "./FirmType";

export class Firm {
  constructor(
    private id ?: number,
    private siret ?: string,
    private name ?: string,
    private address ?: Address,
    private type ?: FirmType,
  ) {
  }
}
