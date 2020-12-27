import { Gender } from "./Gender";
import { Department } from "./Department";
import { Address, AddressForm, AddressRequest } from "./Address";
import { Nationality } from "./Nationality";

export interface Consultant {
  id: number;
  lastName: string;
  firstName: string;
  birthday?: string;
  gender: Gender;
  telephone?: string;
  email: string;
  schoolYear?: number;
  department?: Department;
  username: string;
  address: Address;
  droitImage: boolean;
  nationality: Nationality;
  isApprentice?: boolean;
  isGraduate?: boolean;
  socialSecurityNumber?: string;
}

export interface ConsultantForm {
  lastName: string;
  firstName: string;
  birthday?: string;
  genderId: string;
  telephone?: string;
  email: string;
  schoolYear: string;
  departmentId: string;
  username: string;
  password?: string;
  address: AddressForm;
  droitImage?: string;
  isApprentice?: string;
  isGraduate?: string;
}

export interface ConsultantSearchData {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  isFrench: boolean;
}

export interface ConsultantRequest {
  lastName: string;
  firstName: string;
  birthday?: string;
  genderId: number;
  telephone?: string;
  email: string;
  schoolYear?: number;
  departmentId?: number;
  username: string;
  password?: string;
  address: AddressRequest;
  droitImage: boolean;
  nationalityId: number;
  isApprentice?: boolean;
  isGraduate?: boolean;
  socialSecurityNumber?: string;
}
