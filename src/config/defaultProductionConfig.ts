import { IConfig } from "./IConfig";
import { Environment } from "./environment";

export class DefaultProductionConfig implements IConfig {
  env = Environment.production;
  httpPort = 80;
  clientBaseUrl = "TBD";
  useMock = false;
  logLevel = "info";
}