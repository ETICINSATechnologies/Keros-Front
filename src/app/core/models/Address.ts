import { Country } from "./Country";

export interface Address {
  id: number;
  line1: string;
  line2?: string;
  postalCode: number;
  city: string;
  country: Country;
}

export interface AddressForm {
  line1: string;
  line2: string;
  postalCode: string;
  city: string;
  countryId: string;
}

export interface AddressRequest {
  line1: string;
  line2?: string;
  postalCode: number;
  city: string;
  countryId: number;
}
