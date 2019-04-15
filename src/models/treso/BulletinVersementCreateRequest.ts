import { AddressCreateRequest } from "../core/AddressCreateRequest";

export class BulletinVersementCreateRequest {
  constructor (
    public missionRecapNumber ?: string,
    public consultantSocialSecurityNumber ?: string,
    public address ?: AddressCreateRequest,
    public email ?: string,
    public studyId ?: number,
    public consultantName ?: number,
    public clientName ?: string,
    public projectLead ?: string,
    public isTotalJeh ?: boolean,
    public isStudyPaid ?: boolean,
    public amountDescription ?: string
  ) {}
}
