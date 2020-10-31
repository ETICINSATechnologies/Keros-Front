import {
  Department,
  Country,
  Pole,
  Address,
  Gender
} from "../../core/models";

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
}
