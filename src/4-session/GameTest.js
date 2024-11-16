import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, mock, it, afterEach, after } from "node:test"; // https://nodejs.org/api/test.html
import { Cell, Game } from "./Game.js";

// Baby Steps - run tests every 5 minutes
// Tell Dont Ask - every method returns void.

describe(`Game`, () => {
  after(() => {});

  afterEach(() => {});

  it(`should have board with cell`, () => {
    // Given
    const cells = [new Cell(0, 0)];

    // When
    const game = new Game(cells);

    // Then
    assert.strictEqual(game.cells.length, 1);
  });

  it(`alone cell dies`, () => {
    // Given
    const cells = [new Cell(0, 0)];
    const game = new Game(cells);

    // When
    game.next();

    // Then
    assert.strictEqual(game.cells.length, 0);
  });

  it(`cell should decide if survives`, () => {
    // Given
    const cell = new Cell(0, 0);
    const cells = [cell];

    // When
    cell.shouldSeppuku(cells);

    // Then
    assert.strictEqual(cells.length, 0);
  });

  it(`cell should survive when enough neighbours`, () => {
    // Given
    const cell = new Cell(0, 0);
    const cells = [cell, new Cell(0, 1), new Cell(1, 0)];

    // When
    cell.shouldSeppuku(cells);

    // Then
    assert.strictEqual(cells.length, 3);
  });

  it(`cell should die when no neigbours`, () => {
    // Given
    const cell = new Cell(0, 0);
    const cells = [cell, new Cell(0, 2), new Cell(2, 0)];

    // When
    cell.shouldSeppuku(cells);

    // Then
    assert.strictEqual(cells.length, 2);
  });
});
