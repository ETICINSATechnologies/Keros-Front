export class ContactCreateRequest {
  constructor(
    private firstName ?: string,
    private lastName ?: string,
    private genderId ?: number,
    private firmId ?: number,
    private email ?: string,
    private telephone ?: string,
    private cellphone ?: string,
    private position ?: string,
    private notes ?: string,
    private old ?: boolean,
  ) {}
}