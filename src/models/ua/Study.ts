import { Firm } from "./Firm";
import { Status } from "./Status";
import { Field } from "./Field";
import { Provenance } from "./Provenance";
import { Contact } from "./Contact";
import { Member } from "../core/Member";
import { StudyDocument } from "./StudyDocument";

export class Study {
  constructor(
    private id ?: number,
    private name ?: string,
    private description ?: string,
    private field ?: Field,
    private status ?: Status,
    private provenance ?: Provenance,
    private signDate ?: string,
    private endDate ?: string,
    private managementFee ?: number,
    private realizationFee ?: number,
    private rebilledFee ?: number,
    private ecoparticipationFee ?: number,
    private outsourcingFee ?: number,
    private archivedDate ?: string,
    private firm ?: Firm,
    private contacts ?: Contact[],
    private leaders ?: Member[],
    public consultants ?: Member[],
    public qualityManagers ?: Member[],
    private confidential ?: boolean,
  ) {}
}