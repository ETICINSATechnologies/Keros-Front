import { Country } from "./Country";

export interface Address {
  id?: number;
  line1?: string;
  line2?: string;
  postalCode: string;
  city?: string;
  country?: Country;
}

export interface AddressRequest {
  line1?: string;
  line2?: string;
  postalCode?: string;
  city?: string;
  countryId?: string;
}
