import { IConfig } from "./IConfig";
import { Environment } from "./environment";

export class DefaultStagingConfig implements IConfig {
  env = Environment.staging;
  httpPort = 80;
  clientBaseUrl = "TBD";
  useMock = false;
  logLevel = "info";
}