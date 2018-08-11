import { IConfig } from "./IConfig";
import { Environment } from "./Environment";

export class LocalConfig implements IConfig {
  env: Environment = Environment.local;
  httpPort = 8080;
  clientBaseUrl = "http://127.0.0.1:8000/api/v1";
  useMock = false;
  logLevel = "debug";
}