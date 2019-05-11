import { Gender } from "./Gender";
import { Department } from "./Department";
import { Address } from "./Address";
import { IStringable } from "../interface/IStringable";

export class Consultant implements IStringable {
    constructor(
        public id ?: number,
        public firstName ?: string,
        public lastName ?: string,
        public username ?: string,
        public gender ?: Gender,
        public email ?: string,
        public birthday ?: string,
        public department ?: Department,
        public schoolYear ?: number,
        public telephone ?: string,
        public address ?: Address
    ) {
    }

    toString(): string {
        return this.firstName + " " + this.lastName;
    }
}
