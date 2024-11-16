import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, it } from "node:test"; // https://nodejs.org/api/test.html
import { Cell, Game } from "./Game.js";
import { GptFactory, OpenAiProvider } from "./OpenAi.js";

describe(`Game`, () => {
  const chat = GptFactory.forProvider(OpenAiProvider.OpenAi);

  const mapAnswerCells = (cells: { x: number; y: number }[]) =>
    new Set(cells.map(({ x, y }) => new Cell(x, y)));

  it(`should properly advance to next generation`, async () => {
    // Given
    const block = [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(0, 1),
      new Cell(1, 1),
    ];
    const game = new Game(block);

    const promptText = `
    We are playing Conways Game of Life.
    You will get a JavaScript Set string representation at the end of this message.
    Please format the response in a form of JSON array, containing { x: number; y: number; } objects.
    Return only valid next generation in JSON array format.
    Don't use Markdown.
    
    ${game}`;

    // console.log(game);

    // When
    const answer = await chat.prompt(promptText);
    const nextGeneration = mapAnswerCells(JSON.parse(answer));

    // console.log({ promptText });
    // console.log({ answer });
    // console.log({ nextGeneration });

    // Then
    assert.deepEqual(new Set(block), nextGeneration);
  });
});
