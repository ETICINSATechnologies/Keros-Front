import {
  Department,
  Country,
  Pole,
  Address,
  AddressForm,
  AddressRequest,
  Gender
} from "../../core/models";

import { Document } from "./Document";

export interface MemberRegistration {
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
  wantedPole: Pole;
  address: Address;
  hasPaid: boolean;
  droitImage: boolean;
  documents?: Document[];
}

export interface MemberRegistrationForm {
  lastName: string;
  firstName: string;
  birthday: string;
  genderId: string;
  phoneNumber: string;
  email: string;
  outYear: string;
  departmentId: string;
  nationalityId: string;
  wantedPoleId: string;
  address: AddressForm;
  hasPaid?: string;
  droitImage?: string;
}

export interface MemberRegistrationSearchData {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  department: string;
  wantedPole: string;
  hasPaid: boolean;
}

export interface MemberRegistrationRequest {
  firstName: string;
  lastName: string;
  departmentId: number;
  email: string;
  genderId: number;
  birthday: string;
  phoneNumber: string;
  outYear: number;
  nationalityId: number;
  wantedPoleId: number;
  address: AddressRequest;
  hasPaid: boolean;
  droitImage: boolean;
}
