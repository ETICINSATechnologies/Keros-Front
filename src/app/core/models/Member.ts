import { Timestamp } from "../../common/models";

import { Gender } from "./Gender";
import { Department } from "./Department";
import { Address, AddressForm, AddressRequest } from "./Address";
import { Position, PositionForm, PositionRequest } from "./Position";

export interface Member {
  id: number;
  lastName: string;
  firstName: string;
  birthday: string;
  gender: Gender;
  telephone: string;
  email: string;
  emailETIC?: string;
  schoolYear: number;
  department: Department;
  username: string;
  address: Address;
  positions: Position[];
  company?: string;
  isAlumni: boolean;
  droitImage: boolean;
  dateRepayment: Timestamp;
}

export interface MemberForm {
  lastName: string;
  firstName: string;
  birthday: string;
  genderId: string;
  telephone: string;
  email: string;
  emailETIC: string;
  schoolYear: string;
  departmentId: string;
  username: string;
  password: string;
  address: AddressForm;
  positions: PositionForm[];
  positionToAdd: {[key: string]: string},
  company?: string;
  isAlumni?: string;
  droitImage?: string;
}

export interface MemberSearchData {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  positionId?: number;
  poleId?: number;
  company?: string;
}

export interface MemberRequest {
  lastName: string;
  firstName: string;
  birthday: string;
  genderId: number;
  telephone: string;
  email: string;
  emailETIC?: string;
  schoolYear: number;
  departmentId: number;
  username: string;
  password?: string;
  address: AddressRequest;
  positions: PositionRequest[];
  company?: string;
  isAlumni: boolean;
  droitImage: boolean;
}
