export class Member {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private username ?: string,
    private gender ?: string,
    private email ?: string,
    private birthday ?: string,
    private deparmentId ?: number,
    private schoolYear ?: number,
    private telephone ?: string,
    private addressId ?: number,
    private positionId ?: number[],
  ) {
  }

}