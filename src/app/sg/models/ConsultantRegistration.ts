import { Timestamp } from "../../common/models";
import {
  Department,
  Country,
  Address,
  Gender
} from "../../core/models";

export interface ConsultantRegistration {
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
  socialSecurityNumber?: string;
  address?: Address;
  droitImage?: boolean;
  createdDate?: Timestamp;
}
