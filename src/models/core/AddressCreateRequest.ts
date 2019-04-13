import { IStringable } from "../interface/IStringable";

export class AddressCreateRequest implements IStringable {
  constructor(
    public line1 ?: string,
    public line2 ?: string,
    public postalCode ?: string,
    public city ?: string,
    public countryId ?: number,
  ) {
  }
}