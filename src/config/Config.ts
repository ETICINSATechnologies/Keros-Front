import { IConfig } from "./IConfig";
import { LocalConfig } from "./LocalConfig";
import { TestingConfig } from "./TestingConfig";
import { StagingConfig } from "./StagingConfig";
import { Environment } from "./Environment";
import * as winston from "winston";
import { MockConfig } from "./MockConfig";

export class Config {

  private static activeConfig: IConfig;

  public static bootstrap() {
    // Don't bootstrap if config is already loaded
    if (this.activeConfig) {
      return;
    }

    const nodeEnv = process.env["NODE_ENV"];
    switch (nodeEnv) {
      case "local":
        this.activeConfig = new LocalConfig();
        break;
      case "mock":
        this.activeConfig = new MockConfig();
        break;
      case "testing":
        this.activeConfig = new TestingConfig();
        break;
      case "staging":
        this.activeConfig = new StagingConfig();
        break;
      default:
        this.activeConfig = new LocalConfig();
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