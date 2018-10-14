export class StudyCreateRequest {
  constructor(
    private id ?: number,
    private projectNumber ?: number,
    private name ?: string,
    private description ?: string,
    private departmentId ?: number,
    private statusId ?: number,
    private signDate ?: Date,
    private endDate ?: Date,
    private managementFee ?: number,
    private applicationFee ?: number,
    private rebilledFee ?: number,
    private archivedDate ?: Date,
    private firmId ?: number,
    private contactIds ?: number[],
    private leaderId ?: number,
    private consultantIds ?: number[],
    private qualityManagerIds ?: number [],
  ) {}
}