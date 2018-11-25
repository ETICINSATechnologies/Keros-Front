import {IRestResponse} from "typed-rest-client/RestClient";
import {Department} from "../../models/core/Department";
import {BaseService} from "../common/BaseService";
import * as winston from "winston";

export class DepartmentService extends BaseService {

  private static cacheDepartmentsValues: Department[] | null = null;
  private static cacheDepartmentsExpires: number = 0;

  static getAllDepartments(callback: (err: any, result: Department[] | null) => void): void {
    if (Date.now() < this.cacheDepartmentsExpires) {
      callback(null, this.cacheDepartmentsValues);
    } else {
      this.rest.getAll<Department>("core/department", this.defaultHeaders()).then(
        (res: IRestResponse<Department[]>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          this.cacheDepartmentsValues = res.result;
          this.cacheDepartmentsExpires = Date.now() + (6 * 3600 * 1000);
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
    }
  }

  static getDepartment(id: number | undefined, callback: (err: any, result: Department | null) => void): void {
    this.rest.get<Department>("core/department/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Department>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }
}