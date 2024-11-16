import { AzureOpenAI } from "openai";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
dotenv.config();

// Game -> Set<Cell<x, y>>

/*
  neighbours < 2      = dies
  neighbours == 2, 3  = survives
  neighbours > 3      = overpopulation (dies)
  neighbours == 3     = born
*/

const env = (value: string | undefined) => {
  if (!value) throw new Error("dupa");
  return value;
};

export class GPT {
  private client: AzureOpenAI;

  constructor() {
    this.client = new AzureOpenAI({
      apiKey: new AzureKeyCredential(env(process.env["API_KEY"])).key,
      endpoint: env(process.env["API_ENDPOINT"]),
      deployment: "gpt-4o-mini",
      apiVersion: "2024-08-01-preview",
    });
  }

  async prompt(message: string) {
    const chatCompletion = await this.client.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "",
    });

    return chatCompletion.choices[0].message?.content;
  }
}

export class Cell {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Game {
  public cells: Set<Cell>;

  constructor(cells: Cell[]) {
    this.cells = new Set(cells);
  }
}
