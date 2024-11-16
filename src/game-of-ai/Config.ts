import dotenv from "dotenv";
dotenv.config();

export class Config {
  readonly PORT: number;
  readonly OPENAI_API_KEY: string;
  readonly API_ENDPOINT: string;

  constructor() {
    this.PORT = this.normalizePort(this.readEnv("PORT"));
    this.OPENAI_API_KEY = this.readEnv("OPENAI_API_KEY");
    this.API_ENDPOINT = this.readEnv("API_ENDPOINT");
  }

  private readEnv(variableName: string): string | never {
    const envValue = process.env[variableName];

    if (envValue === undefined) {
      throw new Error(`No environment variable "${variableName}".`);
    }

    return envValue;
  }

  private normalizePort(port: string): number {
    const numericPort = Number.parseInt(port, 10);

    if (Number.isNaN(numericPort)) {
      throw new Error(`Cannot parse port "${port}".`);
    }

    return numericPort;
  }
}
