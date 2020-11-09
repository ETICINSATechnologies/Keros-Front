import {
  Department,
  Country,
  Pole,
  Address,
  AddressRequest,
  Gender
} from "../../core/models";

import { Document } from "./Document";

export interface MemberRegistration {
  id?: number;
  firstName?: string;
  lastName?: string;
  department?: Department;
  email?: string;
  gender?: Gender;
  birthday?: string;
  phoneNumber?: string;
  outYear?: number;
  nationality?: Country;
  wantedPole?: Pole;
  address?: Address;
  hasPaid?: boolean;
  droitImage?: boolean;
  documents?: Document[];
}

export interface MemberRegistrationRequest {
  firstName?: string;
  lastName?: string;
  departmentId?: number;
  email?: string;
  genderId?: Number;
  birthday?: string;
  phoneNumber?: string;
  outYear?: number;
  nationalityId?: number;
  wantedPoleId?: number;
  address?: AddressRequest;
  hasPaid?: boolean;
  droitImage?: boolean;
}
