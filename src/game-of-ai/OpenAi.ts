import OpenAI, { AzureOpenAI } from "openai";
import { AzureKeyCredential } from "@azure/core-auth";
import { Config } from "./Config.js";

export enum OpenAiProvider {
  OpenAi = "openai",
  Azure = "azure",
}

export class AiClient {
  readonly client: OpenAI;

  constructor(provider: OpenAiProvider, private config = new Config()) {
    switch (provider) {
      case OpenAiProvider.OpenAi: {
        this.client = this.createOpenAiClient();
        return;
      }
      case OpenAiProvider.Azure: {
        this.client = this.createAzureOpenAiClient();
        return;
      }
      default:
        throw new Error(`Unsupported OpenAI provider "${provider}".`);
    }
  }

  private createOpenAiClient() {
    return new OpenAI({
      apiKey: this.config.OPENAI_API_KEY,
    });
  }

  private createAzureOpenAiClient() {
    return new AzureOpenAI({
      apiKey: new AzureKeyCredential(this.config.OPENAI_API_KEY).key,
      endpoint: this.config.API_ENDPOINT,
      deployment: "gpt-4o-mini",
      apiVersion: "2024-08-01-preview",
    });
  }
}

export class GPT {
  constructor(private client: OpenAI) {}

  async prompt(message: string): Promise<string> {
    const chatCompletion = await this.client.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4o-mini",
    });

    const answer = chatCompletion.choices[0].message?.content;

    if (answer === null) throw new Error("GPT answer is null.");

    return answer;
  }
}

export class GptFactory {
  static forProvider(provider: OpenAiProvider) {
    const { client } = new AiClient(provider, new Config());
    return new GPT(client);
  }
}
