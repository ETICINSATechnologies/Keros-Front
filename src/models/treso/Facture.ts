import { Address } from "../core/Address";
import { Study } from "../ua/Study";
import { Member } from "../core/Member";
import { FactureType } from "./FactureType";

export class Facture {
  constructor(
    private id ?: number,
    private numero ?: string,
    private fullAddress ?: Address,
    private clientName ?: string,
    private contactName ?: string,
    private contactEmail ?: string,
    private study ?: Study,
    private type ?: FactureType,
    private amountDescription ?: string,
    private subject ?: string,
    private agreementSignDate ?: string,
    private amountHT ?: number,
    private taxPercentage ?: number | 20,
    private amountTTC ?: number,
    private dueDate ?: string,
    private additionalInformation ?: string,
    private createdDate ?: string,
    private createdBy ?: Member,
    private validatedByUa ?: boolean,
    private validatedByUaDate ?: string,
    private validatedByUaMember ?: Member,
    private validatedByPerf ?: boolean,
    private validatedByPerfDate ?: string,
    private validatedByPerfMember ?: Member,
  ) {}
}