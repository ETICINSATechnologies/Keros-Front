import winston from "winston";

import { Environment } from "./environment";

export class Config {
	private static activeConfig: {
		readonly env: Environment;
		readonly httpPort: number;
		readonly clientBaseUrl: string;
		readonly backendBaseUrl: string;
		readonly useMock: boolean;
		readonly logLevel: string;
	};

	public static bootstrap() {
		if (this.activeConfig) {
			return;
		}

		const nodeEnv = process.env.NODE_ENV;
		switch (nodeEnv) {
			case "mock":
				this.activeConfig = require("../../.deploy/mock-config.json");
				break;
			case "testing":
				this.activeConfig = require("../../.deploy/testing-config.json");
				break;
			default:
				this.activeConfig = require("../../config.json");
				break;
		}

		winston.configure({
			level: this.activeConfig.logLevel,
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: __dirname + "/../../logs/app.log",
					maxsize: 2048
				})
			]
		});

		winston.info("Running configuration in " + this.env + " environment");
	}

	public static get env(): Environment {
		return this.activeConfig.env;
	}

	public static get clientBaseUrl(): string {
		return this.activeConfig.clientBaseUrl;
	}

	public static get backendBaseUrl(): string {
		return this.activeConfig.backendBaseUrl;
	}

	public static get httpPort(): number {
		return this.activeConfig.httpPort;
	}

	public static get useMock(): boolean {
		return this.activeConfig.useMock;
	}
}

