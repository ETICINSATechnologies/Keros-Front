import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";
import {
	MemberService,
	DepartmentService,
	GenderService,
	CountryService,
	PositionService,
	PoleService
} from "./services";

export class CoreController {
	static getDashboard(req: Request, res: Response, next: NextFunction) {
		winston.debug("Getting dashboard");
		const connectedUser = JSON.parse(req.cookies.connectedUser);
		res.render("core/dashboard", {
			connectedUser,
			route: req.originalUrl
		});
	}

	static async getConnectedProfile(req: Request, res: Response, next: NextFunction) {
		winston.debug("Getting connected profile");
		const connectedUser = JSON.parse(req.cookies.connectedUser);
		const isMember = req.cookies.isMember;

		const departments = await DepartmentService.getAll();
		const genders = await GenderService.getAll();
		const countries = await CountryService.getAll();
		const positions = await PositionService.getAll();
		const poles = await PoleService.getAll();

		res.render("core/profile", {
			connectedUser,
			route: req.originalUrl,
			isMember,
			departments,
			genders,
			countries,
			positions,
			poles,
			modify: false
		});
	}
}
