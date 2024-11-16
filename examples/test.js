import assert from "node:assert/strict"; // https://nodejs.org/api/assert.html
import { describe, mock, it, afterEach, after } from "node:test"; // https://nodejs.org/api/test.html
import { Logger, NotNumberError, calculate } from "./implementation.js";

describe(`calculate()`, () => {
  // Setup
  const logMock = mock.method(Logger, "log");

  after(() => {
    logMock.mock.restore();
  });

  afterEach(() => {
    logMock.mock.resetCalls();
  });

  // Helpers
  const notNumbers = [
    "42",
    "",
    "foo",
    NaN, // typeof number ;)
    true,
    null,
    undefined,
    {},
    [],
    () => {},
  ];

  const results = [
    { x: 42, y: 2, expected: 44 },
    { x: 42, y: -2, expected: 40 },
    { x: -42, y: 42, expected: 0 },
    { x: -42, y: -2, expected: -44 },
    { x: 0, y: 0, expected: 0 },
  ];

  const errorMessage = (name, value) =>
    `${name} is not a number or is NaN. ${name}: ${typeof value} = ${value}`;

  notNumbers.forEach((x) => {
    it(`should throw NotNumberError when invalid type of x`, () => {
      // Given
      const y = 42;
      const error = new NotNumberError(errorMessage("x", x));

      // Expect
      assert.throws(() => calculate(x, y), error);
    });
  });

  notNumbers.forEach((y) => {
    it(`should throw NotNumberError when invalid type of y`, () => {
      // Given
      const x = 42;
      const error = new NotNumberError(errorMessage("y", y));

      // Expect
      assert.throws(() => calculate(x, y), error);
    });
  });

  notNumbers.forEach((xy) => {
    it(`should throw NotNumberError for "x" as first when both x & y is invalid`, () => {
      // Given
      const x = xy;
      const y = xy;
      const error = new NotNumberError(errorMessage("x", x));

      // Expect
      assert.throws(() => calculate(x, y), error);
    });
  });

  it(`should not throw for valid number inputs of x & y`, () => {
    // Given
    const x = 42;
    const y = -2;
    const xError = new NotNumberError(errorMessage("x", x));
    const yError = new NotNumberError(errorMessage("y", y));

    // Expect
    assert.doesNotThrow(() => calculate(x, y), xError);
    assert.doesNotThrow(() => calculate(x, y), yError);
  });

  results.forEach(({ x, y, expected }) => {
    it(`should return correct result`, () => {
      // When
      const result = calculate(x, y);

      // Then
      assert.strictEqual(result, expected);
    });
  });

  results.forEach(({ x, y }) => {
    it(`should call log`, (context) => {
      // Given
      const x = 10;
      const y = -2;

      // When
      calculate(x, y);

      // Then
      assert.strictEqual(logMock.mock.callCount(), 1);
    });
  });
});
