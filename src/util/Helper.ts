import { Position } from "../models/core/Position";

export function queryStringify(data: any) {
  const ret = [];
  for (const d in data) {
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  return ret.join("&");
}

export function isSG(positions: Position[]) {
  return positions.some(function (pos: Position) {
    return 22 === pos.id;
  });
}
