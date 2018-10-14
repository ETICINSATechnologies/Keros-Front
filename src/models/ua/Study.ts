import { Department } from "../core/Department";
import { Firm } from "./Firm";
import { Status } from "./Status";
import { ContactShort } from "./ContactShort";
import { MemberShort } from "../core/MemberShort";

export class Study {
  constructor(
    private id ?: number,
    private projectNumber ?: number,
    private name ?: string,
    private description ?: string,
    private department ?: Department,
    private status ?: Status,
    private signDate ?: string,
    private endDate ?: string,
    private managementFee ?: number,
    private applicationFee ?: number,
    private rebilledFee ?: number,
    private archivedDate ?: string,
    private firm ?: Firm,
    private contacts ?: ContactShort[],
    private leader ?: MemberShort,
    private consultants ?: MemberShort[],
    private qualityManagers ?: MemberShort[],
  ) {}
}