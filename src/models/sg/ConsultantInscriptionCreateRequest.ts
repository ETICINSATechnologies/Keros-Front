import { IStringable } from "../interface/IStringable";
import { AddressCreateRequest } from "../core/AddressCreateRequest";
import { UploadedFile } from "express-fileupload";

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
        public documentIdentity ?: UploadedFile | UploadedFile[],
        public documentScolarityCertificate ?: UploadedFile | UploadedFile[],
        public documentRib ?: UploadedFile | UploadedFile[],
        public documentVitaleCard ?: UploadedFile | UploadedFile[],
        public documentResidencePermit ?: UploadedFile | UploadedFile[],
    ) {}
}
