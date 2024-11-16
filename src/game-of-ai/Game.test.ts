import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, it } from "node:test"; // https://nodejs.org/api/test.html
import { Cell, Game } from "./Game.js";
import { GptFactory, OpenAiProvider } from "./OpenAi.js";

describe(`Game`, () => {
  const chat = GptFactory.forProvider(OpenAiProvider.OpenAi);

  it(`should properly advance to next generation`, async () => {
    // Given
    const block = [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(0, 1),
      new Cell(1, 1),
    ];
    const game = new Game(block, chat);

    // When
    const nextGeneration = await game.nextGeneration();

    console.log({ game: game.toString() });
    console.log({ nextGeneration });

    // Then
    assert.deepEqual(new Set(block), nextGeneration);
  });
});
