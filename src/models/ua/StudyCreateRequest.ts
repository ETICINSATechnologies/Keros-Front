export class StudyCreateRequest {
  constructor(
    private projectNumber ?: number,
    private name ?: string,
    private description ?: string,
    private fieldId ?: number,
    private statusId ?: number,
    private provenanceId ?: number,
    private signDate ?: Date,
    private endDate ?: Date,
    private managementFee ?: number,
    private realizationFee ?: number,
    private rebilledFee ?: number,
    private ecoparticipationFee ?: number,
    private outsourcingFee ?: number,
    private archivedDate ?: Date,
    private firmId ?: number,
    private contactIds ?: number[],
    private leaderIds ?: number[],
    private consultantIds ?: number[],
    private qualityManagerIds ?: number [],
  ) {}
}