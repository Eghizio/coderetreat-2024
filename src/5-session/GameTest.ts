import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, mock, it, afterEach, after } from "node:test"; // https://nodejs.org/api/test.html
import { Cell, Game } from "./Game.js";

// Baby Steps - run tests every 5 minutes
// Tell Dont Ask - every method returns void.

describe(`Game`, () => {
  after(() => {});

  afterEach(() => {});

  it(`should xyz`, () => {
    // Given
    const cells = 2;

    // When
    const game = cells;

    // Then
    assert.strictEqual(game, 2);
  });
});
