import { IRestResponse } from "typed-rest-client/RestClient";
import { Department } from "../../models/core/Department";
import { BaseService } from "../common/BaseService";
import * as winston from "winston";

export class DepartmentService extends BaseService {
  static getAllDepartments(callback: (err: any, result: Department[] | null) => void): void {
    this.rest.getAll<Department>("core/department").then(
      (res: IRestResponse<Department[]>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getAllDepartment response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getDepartment(id: number | undefined, callback: (err: any, result: Department | null) => void): void {
    this.rest.get<Department>("core/department/" + id).then(
      (res: IRestResponse<Department>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("getDepartment response with status " + res.statusCode);
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}