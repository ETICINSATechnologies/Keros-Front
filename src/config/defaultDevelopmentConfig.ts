import { IConfig } from "./IConfig";
import { Environment } from "./environment";

export class DefaultDevelopmentConfig implements IConfig {
  env: Environment = Environment.development;
  httpPort = 8080;
  clientBaseUrl = "127.0.0.8000";
  useMock = false;
  logLevel = "debug";
}