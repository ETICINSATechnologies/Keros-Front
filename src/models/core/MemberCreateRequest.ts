import {AddressCreateRequest} from "./AddressCreateRequest";

export class MemberCreateRequest {
  constructor(
    public firstName ?: string,
    public lastName ?: string,
    public username ?: string,
    public password ?: string,
    public genderId ?: number,
    public email ?: string,
    public birthday ?: string,
    public departmentId ?: number,
    public schoolYear ?: number,
    public telephone ?: string,
    public address ?: AddressCreateRequest,
    public positionIds ?: number[],
  ) {
  }

}