import { AddressCreateRequest } from "../core/AddressCreateRequest";

export class FactureCreateRequest {
  constructor (
    public numero ?: string,
    public fullAddress ?: AddressCreateRequest,
    public clientName ?: string,
    public contactName ?: string,
    public contactEmail ?: string,
    public studyId ?: number,
    public type ?: string,
    public amountDescription ?: string,
    public subject ?: string,
    public agreementSignDate ?: string,
    public amountHT ?: number,
    public taxPercentage ?: number | 20,
    public dueDate ?: string,
    public additionalInformation ?: string
  ) {}
}
