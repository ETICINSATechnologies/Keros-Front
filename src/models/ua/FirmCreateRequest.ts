import { Address } from "../core/Address";

export class FirmCreateRequest {
  constructor(
    private siret ?: string,
    private name ?: string,
    private address ?: Address,
    private typeId ?: number,
  ) {
  }
}