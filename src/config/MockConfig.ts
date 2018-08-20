import { IConfig } from "./IConfig";
import { Environment } from "./Environment";

export class MockConfig implements IConfig {
  env: Environment = Environment.mock;
  httpPort = 8080;
  clientBaseUrl = "";
  useMock = true;
  logLevel = "debug";
}