import { IStringable } from "../interface/IStringable";
import { AddressCreateRequest } from "../core/AddressCreateRequest";

export class MemberInscriptionCreateRequest implements IStringable {
  constructor(
    public firstName ?: string,
    public lastName ?: string,
    public departmentId ?: number,
    public email ?: string,
    public phoneNumber ?: string,
    public outYear ?: number,
    public nationalityId ?: number,
    public wantedPoleId ?: number,
    public address ?: AddressCreateRequest
  ) {}
}
