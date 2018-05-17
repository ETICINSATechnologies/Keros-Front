import { IConfig } from "./IConfig";
import { Environment } from "./environment";

export class DefaultMockConfig implements IConfig {
  env: Environment = Environment.mock;
  httpPort = 8080;
  clientBaseUrl = "";
  useMock = true;
  logLevel = "debug";
}