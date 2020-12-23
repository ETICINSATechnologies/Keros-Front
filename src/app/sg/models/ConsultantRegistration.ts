import { Timestamp } from "../../common/models";
import {
  Department,
  Country,
  Address,
  AddressForm,
  AddressRequest,
  Gender
} from "../../core/models";

export interface ConsultantRegistration {
  id: number;
  firstName: string;
  lastName: string;
  department: Department;
  email: string;
  gender: Gender;
  birthday: string;
  phoneNumber: string;
  outYear: number;
  nationality: Country;
  socialSecurityNumber?: string;
  address: Address;
  droitImage: boolean;
  createdDate: Timestamp;
  isApprentice: boolean;
}

export interface ConsultantRegistrationForm {
  lastName: string;
  firstName: string;
  departmentId: string;
  email: string;
  genderId: string;
  birthday: string;
  phoneNumber: string;
  outYear: string;
  nationalityId: string;
  socialSecurityNumber?: string;
  address: AddressForm;
  droitImage?: string;
  isApprentice?: string;
}

export interface ConsultantRegistrationSearchData {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  department: string;
  createdDate: string;
}

export interface ConsultantRegistrationRequest {
  firstName: string;
  lastName: string;
  departmentId: number;
  email: string;
  genderId: number;
  birthday: string;
  phoneNumber: string;
  outYear: number;
  nationalityId: number;
  socialSecurityNumber?: string;
  address: AddressRequest;
  droitImage: boolean;
  isApprentice: boolean;
}
