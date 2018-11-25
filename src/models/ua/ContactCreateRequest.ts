export class ContactCreateRequest {
  constructor(
    public firstName ?: string,
    public lastName ?: string,
    public genderId ?: number,
    public firmId ?: number,
    public email ?: string,
    public telephone ?: string,
    public cellphone ?: string,
    public position ?: string,
    public notes ?: string,
    public old ?: boolean,
  ) {}
}