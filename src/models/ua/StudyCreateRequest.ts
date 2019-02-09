export class StudyCreateRequest {
  constructor(
    public projectNumber ?: number,
    public name ?: string,
    public description ?: string,
    public fieldId ?: number,
    public statusId ?: number,
    public provenanceId ?: number,
    public signDate ?: Date,
    public endDate ?: Date,
    public managementFee ?: number,
    public realizationFee ?: number,
    public rebilledFee ?: number,
    public ecoparticipationFee ?: number,
    public outsourcingFee ?: number,
    public archivedDate ?: Date,
    public firmId ?: number,
    public contactIds ?: number[],
    public leaderIds ?: number[],
    public consultantIds ?: number[],
    public qualityManagerIds ?: number [],
    public confidential ?: boolean,
  ) {}
}