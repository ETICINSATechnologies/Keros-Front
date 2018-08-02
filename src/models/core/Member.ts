import { Gender } from "./Core";
import { SchoolYear } from "./Core";

export class Member {
    constructor(
        private id ?: number,
        private firstName ?: string,
        private lastName ?: string,
        private username ?: string,
        private gender ?: Gender,
        private email ?: string,
        private birthday ?: Date,
        private deparmentId ?: number,
        private SchoolYear ?: SchoolYear,
        private telephone ?: string,
        private addressId ?: number,
        private positionId ?: number[],
    ) {}

}