import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { HttpError } from "../common/models";

import { MemberService, ConsultantService } from "../core/services";

import { AuthService } from "./services";
import { LoginRequest, LoginResponse } from "./models";

export class AuthController {
	public static viewLoginPage(req: Request, res: Response, next: NextFunction) {
		winston.info("Getting login page");
		res.render("auth/login");
	}

	public static login(req: Request, res: Response, next: NextFunction) {
		AuthService.login({
			username: req.body.username,
			password: req.body.password
		}).then(async (lres: LoginResponse) => {
			const token = lres.token;
			const cMember = await MemberService.getConnectedMember().catch(
				(err: HttpError) => {
					if (err.status !== 404) {
						throw err;
					}
					return;
				}
			);
			const cConsultant = await ConsultantService.getConnectedConsultant().catch(
				(err: HttpError) => {
					if (err.status !== 404) {
						throw err;
					}
					return;
				}
			);
			const cUser = cMember || cConsultant;
			res.cookie("connectedUser", JSON.stringify(cUser)).cookie("token", token).redirect("/");
		}).catch((err: HttpError) => {
			if (err.status === 401) {
				res.status(err.status).render("auth/login", { unauthorized: true });
			} else {
				next(err);
			}
		});
	}

	public static logout(req: Request, res: Response, next: NextFunction) {
		res.clearCookie("token");
		res.clearCookie("connectedUser");
		res.redirect("/auth/login");
	}
}
