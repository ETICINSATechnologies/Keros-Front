import { Gender } from "./Gender";

export class MemberShort {
  constructor(
    private id ?: number,
    private firstName ?: string,
    private lastName ?: string,
    private username ?: string,
    private gender ?: Gender,
  ) {
  }

}