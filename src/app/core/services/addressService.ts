import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Address } from "../models";

export class AddressService extends BaseService {
  static get(id: number): Promise<Address> {
    return this.api.keros.get<Address>(`core/address/${id}`).then(
      (res: HttpResponse<Address>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
