import dotenv from "dotenv";
dotenv.config();

export class Config {
  readonly OPENAI_API_KEY: string;
  readonly API_ENDPOINT: string;

  constructor() {
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
}
