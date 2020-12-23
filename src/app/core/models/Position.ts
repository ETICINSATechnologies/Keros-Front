import { Pole } from "./Pole";

export interface Position {
  id?: number;
  label?: string;
  year?: number;
  isBoard?: boolean;
  pole?: Pole;
}

export interface PositionForm {
  id: string;
  year: string;
  isBoard?: string;
}

export interface PositionRequest {
  id?: number;
  year?: number;
  poleId?: number;
  isBoard?: boolean;
}
