export class Address {
  constructor(
    private id ?: number,
    private line1 ?: string,
    private line2 ?: string,
    private postalCode ?: string,
    private city ?: string,
    private countryId ?: number,
  ) {}
}