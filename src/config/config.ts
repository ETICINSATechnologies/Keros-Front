import { IConfig } from "./IConfig";
import { DefaultDevelopmentConfig } from "./defaultDevelopmentConfig";
import { DefaultTestingConfig } from "./defaultTestingConfig";
import { DefaultStagingConfig } from "./defaultStagingConfig";
import { DefaultProductionConfig } from "./defaultProductionConfig";
import { Environment } from "./environment";
import * as winston from "winston";

export class Config {

  private static activeConfig: IConfig;

  public static bootstrap() {
    const nodeEnv = process.env["NODE_ENV"];
    switch (nodeEnv) {
      case "development":
        this.activeConfig = new DefaultDevelopmentConfig();
        break;
      case "testing":
        this.activeConfig = new DefaultTestingConfig();
        break;
      case "staging":
        this.activeConfig = new DefaultStagingConfig();
        break;
      case "production":
        this.activeConfig = new DefaultProductionConfig();
        break;
      default:
        this.activeConfig = new DefaultDevelopmentConfig();
        break;
    }

    winston.configure({
      level: this.activeConfig.logLevel,
      transports: [
        new winston.transports.Console({
          colorize: true
        })
      ]
    });

    winston.info("Running configuration in " + Environment[this.activeConfig.env] + " environment");
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