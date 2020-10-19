import winston from "winston";

import { BaseService } from "../../common/services";
import { HttpResponse, HttpError } from "../../common/models";

import { Department } from "../models";

export class DepartmentService extends BaseService {
  private static cacheValues: Department[];
  private static cacheExpires = 0;

  static getAll(): Promise<Department[]> {
    if (Date.now() < DepartmentService.cacheExpires) {
      winston.debug("Loaded departments from cache");
      return new Promise<Department[]>((resolve, reject) => resolve(DepartmentService.cacheValues));
    }

    return this.api.keros.get<Department[]>("core/department").then(
      (res: HttpResponse<Department[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        DepartmentService.cacheValues = res.data;
        DepartmentService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}
