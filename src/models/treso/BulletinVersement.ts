import { Address } from "../core/Address";
import { Study } from "../ua/Study";
import { Member } from "../core/Member";

export class BulletinVersement {
  constructor(
    private id ?: number,
    private missionRecapNumber ?: string,
    private consultantName ?: string,
    private consultantSocialSecurityNumber ?: string,
    private address ?: Address,
    private email ?: string,
    private study ?: Study,
    private clientName ?: string,
    private projectLead ?: string,
    private isTotalJeh ?: boolean,
    private isStudyPaid ?: boolean,
    private amountDescription ?: string,
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