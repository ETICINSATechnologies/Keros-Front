import { IStringable } from "../interface/IStringable";
import { AddressCreateRequest } from "../core/AddressCreateRequest";
import { UploadedFile } from "express-fileupload";
import * as winston from "winston";
import * as FormData from "form-data";
import {Config} from "../../config/Config";

export class ConsultantInscriptionCreateRequest implements IStringable {
    set firstName(value: string) {
        if (this._formData) {
            this._formData.append("firstName", value);
        }
    }

    set lastName(value: string) {
        if (this._formData) {
            this._formData.append("lastName", value);
        }
    }

    set departmentId(value: number) {
        if (this._formData) {
            this._formData.append("departmentId", value.toString());
        }
    }

    set email(value: string) {
        if (this._formData) {
            this._formData.append("email", value);
        }
    }

    set genderId(value: number) {
        if (this._formData) {
            this._formData.append("genderId", value.toString());
        }
    }

    set birthday(value: string) {
        if (this._formData) {
            this._formData.append("birthday", value);
        }
    }

    set phoneNumber(value: string) {
        if (this._formData) {
            this._formData.append("phoneNumber", value);
        }
    }

    set outYear(value: number) {
        if (this._formData) {
            this._formData.append("outYear", value.toString());
        }
    }

    set nationalityId(value: number) {
        if (this._formData) {
            this._formData.append("nationalityId", value.toString());
        }
    }

    set socialSecurityNumber(value: string) {
        if (this._formData) {
            this._formData.append("socialSecurityNumber", value);
        }
    }

    set address(value: AddressCreateRequest) {
        if (this._formData) {
            if (value.line1) {
                this._formData.append("line1", value.line1);
            }
            if (value.line2) {
                this._formData.append("line2", value.line2);
            }
            if (value.city) {
                this._formData.append("city", value.city);
            }
            if (value.countryId) {
                this._formData.append("countryId", value.countryId.toString());
            }
            if (value.postalCode) {
                this._formData.append("countryId", value.postalCode);
            }
        }
    }
    private setDocument(file: UploadedFile) {
        const fs = require("fs");
        const filePath = "./";
        file.mv(filePath + file.name)
          .then(value => {
              appendFile();
          })
          .catch(e => winston.debug("Move file to local path failed" + e));
        const appendFile = async () => {
            const readStreamFS: ReadableStream = fs.createReadStream(filePath + file.name);
            if (this._formData) {
                this._formData.append(file.name, readStreamFS, file.name);
            }
        };
    }

    set documentIdentity(value: UploadedFile) {
        this.setDocument(value);
    }

    set documentScolarityCertificate(value: UploadedFile) {
        this.setDocument(value);
    }

    set documentRIB(value: UploadedFile) {
        this.setDocument(value);
    }

    set documentVitaleCard(value: UploadedFile) {
        this.setDocument(value);
    }

    set documentResidencePermit(value: UploadedFile) {
        this.setDocument(value);
    }

    set documentCVEC(value: UploadedFile) {
        this.setDocument(value);
    }

    set droitImage(value: boolean) {
        if (this._formData) {
            this._formData.append("droitImage", value);
        }
    }
    constructor(
        public _firstName ?: string,
        public _lastName ?: string,
        public _departmentId ?: number,
        public _email ?: string,
        public _genderId ?: number,
        public _birthday ?: string,
        public _phoneNumber ?: string,
        public _outYear ?: number,
        public _nationalityId ?: number,
        public _socialSecurityNumber ?: string,
        public _address ?: AddressCreateRequest,
        public _documentIdentity ?: string,
        public _documentScolarityCertificate ?: string,
        public _documentRIB ?: string,
        public _documentVitaleCard ?: string,
        public _documentResidencePermit ?: string,
        public _documentCVEC ?: string,
        public _droitImage ?: boolean,
        public _formData ?: FormData
    ) {
        this._formData = new FormData();
    }
}
