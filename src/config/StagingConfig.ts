import { IConfig } from "./IConfig";
import { Environment } from "./Environment";

export class StagingConfig implements IConfig {
  env = Environment.staging;
  httpPort = 8080;
  clientBaseUrl = "http://127.0.0.1:80/api/v1";
  useMock = false;
  logLevel = "info";
}