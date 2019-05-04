import { IStringable } from "./interface/IStringable";
import { UploadedFile } from "express-fileupload";

export class UploadedDocument implements IStringable {
  constructor(
    public file ?: UploadedFile | UploadedFile[]
  ) {}
}
