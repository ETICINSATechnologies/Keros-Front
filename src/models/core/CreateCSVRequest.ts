import { IStringable } from "../interface/IStringable";

export class CreateCSVRequest implements IStringable {
  constructor(
    public idList ?: number[]
  ) {}
}