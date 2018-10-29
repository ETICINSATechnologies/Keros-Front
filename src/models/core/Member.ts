export class Member {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private username ?: string,
    private genderId ?: number,
    private email ?: string,
    private birthday ?: string,
    private departmentId ?: number,
    private schoolYear ?: number,
    private telephone ?: string,
    private addressId ?: number,
    private positionIds ?: number[],
  ) {
  }

}