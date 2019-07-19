import { IStringable } from "../interface/IStringable";
import { AddressCreateRequest } from "../core/AddressCreateRequest";

export class ConsultantInscriptionCreateRequest implements IStringable {
    constructor(
        public firstName ?: string,
        public lastName ?: string,
        public departmentId ?: number,
        public email ?: string,
        public genderId ?: number,
        public birthday ?: string,
        public phoneNumber ?: string,
        public outYear ?: number,
        public nationalityId ?: number,
        public socialSecurityNumber ?: string,
        public address ?: AddressCreateRequest,
        public documentIdentity ?: string,
        public documentScolarityCertificate ?: string,
        public documentRib ?: string,
        public documentVitaleCard ?: string,
        public documentResidencePermit ?: string,
        public droitImage ?: boolean
    ) {}
}
