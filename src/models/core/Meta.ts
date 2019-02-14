export class Meta {
  constructor(
    private page ?: number,
    public totalPages ?: number,
    private totalItems ?: number,
    private itemsPerPage ?: number,
  ) {
  }
}