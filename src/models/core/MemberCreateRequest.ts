import { Address } from "./Address";

export class MemberCreateRequest {
  constructor(
    private firstName ?: string,
    private lastName ?: string,
    private username ?: string,
    private password ?: string,
    private genderId ?: string,
    private email ?: string,
    private birthday ?: string,
    private departmentId ?: number,
    private schoolYear ?: number,
    private telephone ?: string,
    private address ?: Address,
    private positionIds ?: number[],
  ) {
  }

}