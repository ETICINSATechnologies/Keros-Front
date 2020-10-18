import winston from "winston";

import { BaseService } from "../common/services";
import { HttpResponse, HttpError } from "../common/models";

import {
  Address,
  Country,
  Department,
  Gender,
  Pole,
  Position,
  Consultant,
  Member,
  MemberRequest,
  SearchResponse
} from "./models";

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

export class CountryService extends BaseService {
  private static cacheValues: Country[];
  private static cacheExpires = 0;

  static getAll(): Promise<Country[]> {
    if (Date.now() < CountryService.cacheExpires) {
      winston.debug("Loaded countries from cache");
      return new Promise<Country[]>((resolve, reject) => resolve(CountryService.cacheValues));
    }

    return this.api.keros.get<Country[]>("core/country").then(
      (res: HttpResponse<Country[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        CountryService.cacheValues = res.data;
        CountryService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}

export class GenderService extends BaseService {
  private static cacheValues: Gender[];
  private static cacheExpires = 0;

  static getAll(): Promise<Gender[]> {
    if (Date.now() < GenderService.cacheExpires) {
      winston.debug("Loaded genders from cache");
      return new Promise<Gender[]>((resolve, reject) => resolve(GenderService.cacheValues));
    }

    return this.api.keros.get<Gender[]>("core/gender").then(
      (res: HttpResponse<Gender[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        GenderService.cacheValues = res.data;
        GenderService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}

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

export class PoleService extends BaseService {
  private static cacheValues: Pole[];
  private static cacheExpires = 0;

  static getAll(): Promise<Pole[]> {
    if (Date.now() < PoleService.cacheExpires) {
      winston.debug("Loaded poles from cache");
      return new Promise<Pole[]>((resolve, reject) => resolve(PoleService.cacheValues));
    }

    return this.api.keros.get<Pole[]>("core/pole").then(
      (res: HttpResponse<Pole[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        PoleService.cacheValues = res.data;
        PoleService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}

export class PositionService extends BaseService {
  private static cacheValues: Position[];
  private static cacheExpires = 0;

  static getAll(): Promise<Position[]> {
    if (Date.now() < PositionService.cacheExpires) {
      winston.debug("Loaded positions from cache");
      return new Promise<Position[]>((resolve, reject) => resolve(PositionService.cacheValues));
    }

    return this.api.keros.get<Position[]>("core/position").then(
      (res: HttpResponse<Position[]>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        PositionService.cacheValues = res.data;
        PositionService.cacheExpires = Date.now() + (6 * 3600 * 1000);
        return res.data;
      }
    );
  }
}

export class MemberService extends BaseService {
  static get(id: number): Promise<Member> {
    return this.api.keros.get<Member>(`core/member/${id}`).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object) {
    return this.api.keros.get<SearchResponse<Member>>("core/member", { params }).then(
      (res: HttpResponse<SearchResponse<Member>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getCurrent(): Promise<Member> {
    return this.api.keros.get<Member>("core/member/me").then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static updateCurrent(req: MemberRequest): Promise<Member> {
    return this.api.keros.put<Member>(`core/member/me`, req).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static update(id: number, req: MemberRequest): Promise<Member> {
    return this.api.keros.post<Member>(`core/member/${id}`, req).then(
      (res: HttpResponse<Member>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}

export class ConsultantService extends BaseService {
  static get(id: number): Promise<Consultant> {
    return this.api.keros.get<Consultant>(`core/consultant/${id}`).then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getAll(params?: object) {
    return this.api.keros.get<SearchResponse<Consultant>>("core/consultant", { params }).then(
      (res: HttpResponse<SearchResponse<Consultant>>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }

  static getCurrent() {
    return this.api.keros.get<Consultant>("core/consultant/me").then(
      (res: HttpResponse<Consultant>) => {
        winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
        return res.data;
      }
    );
  }
}
