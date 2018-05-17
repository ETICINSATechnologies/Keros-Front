import { IConfig } from "./IConfig";
import { Environment } from "./environment";

export class DefaultTestingConfig implements IConfig {
  env = Environment.testing;
  httpPort = 8081;
  clientBaseUrl = "";
  useMock = true;
  logLevel = "debug";
}