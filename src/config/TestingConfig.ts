import { IConfig } from "./IConfig";
import { Environment } from "./Environment";

export class TestingConfig implements IConfig {
  env = Environment.testing;
  httpPort = 8081;
  clientBaseUrl = "";
  useMock = true;
  logLevel = "debug";
}