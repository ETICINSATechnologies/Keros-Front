export class Pole {
  constructor(
    private id ?: number,
    private label ?: string,
    private name ?: string,
  ) {}
  toString(): string {
    return "(" + this.label + ")";
  }
}