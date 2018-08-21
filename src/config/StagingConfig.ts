import { IConfig } from "./IConfig";
import { Environment } from "./Environment";

export class StagingConfig implements IConfig {
  env = Environment.staging;
  httpPort = 9000;
  clientBaseUrl = "http://keros-api-dev.etic-insa.com/api/v1";
  useMock = false;
  logLevel = "info";
}