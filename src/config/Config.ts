import { IConfig } from "./IConfig";
import { Environment } from "./Environment";
import * as winston from "winston";

export class Config {

  private static activeConfig: IConfig;

  public static bootstrap() {
    // Don't bootstrap if config is already loaded
    if (this.activeConfig) {
      return;
    }

    const nodeEnv = process.env["NODE_ENV"];
    switch (nodeEnv) {
      case "mock":
        this.activeConfig = require('../../../.deploy/mock-config.json');
        break;
      case "testing":
        this.activeConfig = require('../../../.deploy/testing-config.json');
        break;
      default:
        this.activeConfig = require('../../../config.json');
        break;
    }

    winston.configure({
      level: this.activeConfig.logLevel,
      transports: [
        new winston.transports.Console({
          colorize: true
        }),
        new winston.transports.File({
          filename: __dirname + '/../../../logs/app.log',
          timestamp: true,
          maxsize: 2048
        })
      ]
    });

    winston.info("Running configuration in " + this.getEnv() + " environment");
  }

  public static getEnv(): Environment {
    return this.activeConfig.env;
  }

  public static getClientBaseUrl(): string {
    return this.activeConfig.clientBaseUrl;
  }

  public static getHttpPort(): number {
    return this.activeConfig.httpPort;
  }

  public static getUseMock(): boolean {
    return this.activeConfig.useMock;
  }
}