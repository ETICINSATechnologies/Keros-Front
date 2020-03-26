import { IStringable } from "../interface/IStringable";
import { AddressCreateRequest } from "../core/AddressCreateRequest";
import { UploadedFile } from "express-fileupload";
import * as winston from "winston";
import * as FormData from "form-data";
import {Config} from "../../config/Config";

export class ConsultantInscriptionCreateRequest implements IStringable {
    public addFirstNameToFormData(value: string) {
        if (this.formData) {
            this.formData.append("firstName", value);
        }
    }

    public addLastNameToFormData(value: string) {
        if (this.formData) {
            this.formData.append("lastName", value);
        }
    }

    public addDepartmentIdToFormData(value: number) {
        if (this.formData) {
            this.formData.append("departmentId", value.toString());
        }
    }

    public addEmailToFormData(value: string) {
        if (this.formData) {
            this.formData.append("email", value);
        }
    }

    public addGenderIdToFormData(value: number) {
        if (this.formData) {
            this.formData.append("genderId", value.toString());
        }
    }

    public addBirthdayToFormData(value: string) {
        if (this.formData) {
            this.formData.append("birthday", value);
        }
    }

    public addPhoneNumberToFormData(value: string) {
        if (this.formData) {
            this.formData.append("phoneNumber", value);
        }
    }

    public addOutYearToFormData(value: number) {
        if (this.formData) {
            this.formData.append("outYear", value.toString());
        }
    }

    public addNationalityIdToFormData(value: number) {
        if (this.formData) {
            this.formData.append("nationalityId", value.toString());
        }
    }

    public addSocialSecurityNumberToFormData(value: string) {
        if (this.formData) {
            this.formData.append("socialSecurityNumber", value);
        }
    }

    public addAddressToFormData(value: AddressCreateRequest) {
        if (this.formData) {
            if (value.line1) {
                this.formData.append("line1", value.line1);
            }
            if (value.line2) {
                this.formData.append("line2", value.line2);
            }
            if (value.city) {
                this.formData.append("city", value.city);
            }
            if (value.countryId) {
                this.formData.append("countryId", value.countryId.toString());
            }
            if (value.postalCode) {
                this.formData.append("countryId", value.postalCode);
            }
        }
    }
    public addDroitImageToFormData(value: boolean) {
        if (this.formData) {
            this.formData.append("droitImage", value);
        }
    }
    public addIsApprenticeToFormData(value: boolean) {
        if (this.formData) {
            this.formData.append("isApprentice", value);
        }
    }
    public fillFormData() {
        if (this.address) {
            this.addAddressToFormData(this.address);
        }
        if (this.birthday) {
            this.addBirthdayToFormData(this.birthday);
        }
        if (this.departmentId) {
            this.addDepartmentIdToFormData(this.departmentId);
        }
        if (this.droitImage) {
            this.addDroitImageToFormData(this.droitImage);
        }
        if (this.email) {
            this.addEmailToFormData(this.email);
        }
        if (this.firstName) {
            this.addFirstNameToFormData(this.firstName);
        }
        if (this.genderId) {
            this.addGenderIdToFormData(this.genderId);
        }
        if (this.isApprentice) {
            this.addIsApprenticeToFormData(this.isApprentice);
        }
        if (this.lastName) {
            this.addLastNameToFormData(this.lastName);
        }
        if (this.nationalityId) {
            this.addNationalityIdToFormData(this.nationalityId);
        }
        if (this.outYear) {
            this.addOutYearToFormData(this.outYear);
        }
        if (this.phoneNumber) {
            this.addPhoneNumberToFormData(this.phoneNumber);
        }
        if (this.socialSecurityNumber) {
            this.addSocialSecurityNumberToFormData(this.socialSecurityNumber);
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
            if (this.formData) {
                this.formData.append(file.name, readStreamFS, file.name);
            }
            else {
                winston.debug("form data not defined");
            }
        };
    }

    public addDocumentIdentity(value: UploadedFile) {
        this.setDocument(value);
    }

    public addDocumentScolarityCertificate(value: UploadedFile) {
        this.setDocument(value);
    }

    public addDocumentRIB(value: UploadedFile) {
        this.setDocument(value);
    }

    public addDocumentVitaleCard(value: UploadedFile) {
        this.setDocument(value);
    }

    public addDocumentResidencePermit(value: UploadedFile) {
        this.setDocument(value);
    }

    public addDocumentCVEC(value: UploadedFile) {
        this.setDocument(value);
    }
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
        public droitImage ?: boolean,
        public isApprentice ?: boolean,
        public formData ?: FormData
    ) {
        this.formData = new FormData();
    }
}
