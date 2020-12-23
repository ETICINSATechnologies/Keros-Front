import { BaseService } from "../../common/services";

import { Address } from "../models";

export class AddressService extends BaseService {
  static async get(id: number): Promise<Address> {
    return this.api.keros.get<Address>(`core/address/${id}`);
  }
}
