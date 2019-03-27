import { IStringable } from "./interface/IStringable";

export class Document implements IStringable {
  constructor(
    private id ?: number,
    private name ?: string,
    private isTemplatable ?: boolean,
    private isUploaded ?: boolean
  ) {}
}