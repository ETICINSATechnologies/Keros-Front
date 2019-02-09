import { StudyDocument } from './StudyDocument';

export class StudyDocumentResponse {
  constructor(
    private documents?: StudyDocument[]
  ) {
  }
}