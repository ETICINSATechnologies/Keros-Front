import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";

import { MemberService, ConsultantService } from "../core/services";

import { AuthService } from "./services";
import { LoginRequest, LoginResponse } from "./models";

export class AuthController {
	static viewLoginPage(req: Request, res: Response, next: NextFunction) {
		winston.info("Getting login page");
		res.render("auth/login");
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		let token;

		await AuthService.login({
			username: req.body.username,
			password: req.body.password
		}).then((lres: LoginResponse) => {
			token = lres.token;
		}).catch((err: HttpError) => {
			if (err.status === 401) {
				res.status(err.status).render("auth/login", { unauthorized: true });
			} else {
				next(err);
			}
		});

		const cMember = await MemberService.getCurrent().catch(
			(err: HttpError) => {
				if (err.status !== 404) {
					next(err);
				}
				return;
			}
		);
		const cConsultant = await ConsultantService.getCurrent().catch(
			(err: HttpError) => {
				if (err.status !== 404) {
					next(err);
				}
				return;
			}
		);
		const cUser = cMember || cConsultant;

		res
			.cookie("connectedUser", JSON.stringify(cUser))
			.cookie("token", token)
			.cookie("isMember", Boolean(cMember))
			.redirect("/");
	}

	static logout(req: Request, res: Response, next: NextFunction) {
		res.clearCookie("token");
		res.clearCookie("connectedUser");
		res.clearCookie("isMember");
		res.redirect("/auth/login");
	}
}
