import winston from "winston";

import { BaseService } from "../common/services";
import { HttpResponse, HttpError } from "../common/models";

import { Consultant, Member } from "./models";

export class MemberService extends BaseService {
	static getMemberById(id: number): Promise<Member> {
		return this.api.keros.get<Member>(`core/member/${id}`).then(
			(res: HttpResponse<Member>) => {
				winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
				return res.data;
			}
		);
	}

	static getConnectedMember(): Promise<Member> {
		return this.api.keros.get<Member>("core/member/me").then(
			(res: HttpResponse<Member>) => {
				winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
				return res.data;
			}
		);
	}
}

export class ConsultantService extends BaseService {
	static getConsultantById(id: number): Promise<Consultant> {
		return this.api.keros.get<Consultant>(`core/consultant/${id}`).then(
			(res: HttpResponse<Consultant>) => {
				winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
				return res.data;
			}
		);
	}

	static getConnectedConsultant() {
		return this.api.keros.get<Consultant>("core/consultant/me").then(
			(res: HttpResponse<Consultant>) => {
				winston.debug(`Response : ${JSON.stringify(res.data, null, 2)}`);
				return res.data;
			}
		);
	}
}
