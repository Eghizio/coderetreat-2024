import { z } from "zod";
import type { GPT } from "./OpenAi";

// Game -> Set<Cell<x, y>>

/*
  neighbours <  2     = dies
  neighbours == 2, 3  = survives
  neighbours >  3     = overpopulation (dies)
  neighbours == 3     = born
*/

export class Cell {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}

export const ChatResponseSchema = z
  .object({
    x: z.number().int().safe(),
    y: z.number().int().safe(),
  })
  .array();

export type ChatResponse = z.infer<typeof ChatResponseSchema>;

/* Methods are GPT.prompt() results. */
export class Game {
  public cells: Set<Cell>;

  constructor(cells: Cell[], private chat: GPT) {
    this.cells = new Set(cells);
  }

  async nextGeneration() {
    try {
      const nextCells = await this.generateNextCellsWithAi();
      this.cells = nextCells;
      return nextCells;
    } catch (error) {
      console.error(`Failed to generate cells with Ai.`, error);
      return null;
    }
  }

  mapAnswerCells(cells: { x: number; y: number }[]) {
    return new Set(cells.map(({ x, y }) => new Cell(x, y)));
  }

  private async generateNextCellsWithAi() {
    const promptText = this.createPromptText();
    const chatResponseMessage = await this.chat.prompt(promptText);
    const chatResponseData = JSON.parse(chatResponseMessage);
    const answer = await ChatResponseSchema.parseAsync(chatResponseData);
    return this.mapAnswerCells(answer);
  }

  private createPromptText() {
    return `
    We are playing Conways Game of Life.
    You will get a JavaScript Set string representation at the end of this message.
    Please format the response in a form of JSON array, containing { x: number; y: number; } objects.
    Return only valid next generation in JSON array format.
    Don't use Markdown.
    
    ${this}`;
  }

  toString() {
    const count = this.cells.size;
    const objects = Array.from(this.cells).join(", ");
    return `Set(${count}) { ${objects} }`;
  }
}
