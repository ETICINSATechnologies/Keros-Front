import { Environment } from "./Environment";

export interface IConfig {
  readonly env: Environment;
  readonly httpPort: number;
  readonly clientBaseUrl: string;
  readonly useMock: boolean;
  readonly logLevel: string;
}