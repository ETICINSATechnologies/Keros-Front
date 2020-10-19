import { Gender } from "./Gender";
import { Department } from "./Department";
import { Address, AddressRequest } from "./Address";
import { Nationality } from "./Nationality";

export interface Consultant {
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
  nationality?: Nationality;
}

export interface ConsultantRequest {
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
  droitImage?: boolean;
  nationalityId?: number;
  isApprentice?: boolean;
  isGraduate?: boolean;
  socialSecurityNumber?: string;
}
