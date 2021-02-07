import winston from "winston";

import { configureLogger } from "./logger";
import { Environment } from "./environment";

export class Config {
  private static activeConfig: {
    readonly env: Environment;
    readonly httpPort: number;
    readonly clientBaseUrl: string;
    readonly backendBaseUrl: string;
    readonly useMock: boolean;
    readonly logLevel: string;
    readonly stripeAPIKey: string;
    readonly membershipFeeProductID: string;
  };

  public static bootstrap(): void {
    if (this.activeConfig) {
      return;
    }

    const nodeEnv = process.env.NODE_ENV;
    switch (nodeEnv) {
      default:
        this.activeConfig = require("../../config.json");
        break;
    }

    configureLogger(this.activeConfig.logLevel);

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

  public static get stripeAPIKey(): string {
    return this.activeConfig.stripeAPIKey;
  }

  public static get membershipFeeProductID(): string {
    return this.activeConfig.membershipFeeProductID;
  }
}

