import { AddressCreateRequest } from "./AddressCreateRequest";

export class ConsultantCreateRequest {
    constructor(
        public firstName ?: string,
        public lastName ?: string,
        public username ?: string,
        public password ?: string,
        public genderId ?: number,
        public email ?: string,
        public birthday ?: string,
        public departmentId ?: number,
        public schoolYear ?: number,
        public telephone ?: string,
        public nationalityId ?: number,
        public company ?: string,
        public droitImage ?: boolean,
        public address ?: AddressCreateRequest
    ) {
    }

}
