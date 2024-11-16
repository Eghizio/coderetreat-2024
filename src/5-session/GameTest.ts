import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, it, afterEach, after } from "node:test"; // https://nodejs.org/api/test.html
import { Cell, Game } from "./Game.js";
import { GptFactory, OpenAiProvider } from "./OpenAi.js";

describe(`Game`, () => {
  const chat = GptFactory.forProvider(OpenAiProvider.OpenAi);

  // Set(4) {
  //   Cell { x: 0, y: 0 },
  //   Cell { x: 1, y: 0 },
  //   Cell { x: 0, y: 1 },
  //   Cell { x: 1, y: 1 }
  // }

  const mapAnswerCells = (cells: { x: number; y: number }[]) =>
    new Set(cells.map(({ x, y }) => new Cell(x, y)));

  after(() => {});

  afterEach(() => {});

  it(`should properly advance to next generation`, async () => {
    // Given
    const block = [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(0, 1),
      new Cell(1, 1),
    ];
    const game = new Game(block);

    console.log(game);

    // When
    const promptText = `
    We are playing Conways Game of Life.
    You will get a JavaScript Set string representation at the end of this message.
    Please format the response in a form of JSON array, containing { x: number; y: number; } objects.
    Return only valid next generation in JSON array format.
    Don't use Markdown.
    
    ${game}`;

    const answer = await chat.prompt(promptText);
    const nextGeneration = mapAnswerCells(JSON.parse(answer));

    // Then
    console.log({ promptText });
    console.log({ answer });
    console.log({ nextGeneration });

    assert.deepEqual(new Set(block), nextGeneration);
  });
});
