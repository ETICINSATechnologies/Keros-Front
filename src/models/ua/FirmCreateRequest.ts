import { AddressCreateRequest } from "../core/AddressCreateRequest";

export class FirmCreateRequest {
  constructor(
    public siret ?: string,
    public name ?: string,
    public address ?: AddressCreateRequest,
    public typeId ?: number,
  ) {
  }
}