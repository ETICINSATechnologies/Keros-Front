export class StudyDocument {
  constructor(
    private id ?: number,
    private name ?: string,
    private generateLocation ?: string,
    private uploadLocation ?: string,
    private downloadLocation ?: string,
  ) {}
}