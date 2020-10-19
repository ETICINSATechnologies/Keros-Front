import { Gender } from "./Gender";
import { Department } from "./Department";
import { Address, AddressRequest } from "./Address";
import { Position, PositionRequest } from "./Position";

export interface Member {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: Gender;
  email?: string;
  birthday?: string;
  department?: Department;
  schoolYear?: number;
  telephone?: string;
  address?: Address;
  positions?: Position[];
  company?: string;
}

export interface MemberRequest {
  lastName?: string;
  firstName?: string;
  birthday?: string;
  genderId?: number;
  telephone?: string;
  email?: string;
  emailETIC?: string;
  schoolYear?: number;
  departmentId?: number;
  username?: string;
  password?: string;
  address?: AddressRequest;
  positions?: PositionRequest[];
  isAlumni?: boolean;
  droitImage?: boolean;
}
