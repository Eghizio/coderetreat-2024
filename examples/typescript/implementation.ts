export const Logger = {
  log: (message: string) => console.log(message),
};

export class NotNumberError extends Error {
  constructor(message = "Not a number!") {
    super(message);
  }
}

/* Type of `x` & `y` is `any` to allow any value that will get caught in the validation. */
export const calculate = (x: any, y: any) => {
  if (typeof x !== "number" || Number.isNaN(x)) {
    throw new NotNumberError(
      `x is not a number or is NaN. x: ${typeof x} = ${x}`
    );
  }

  if (typeof y !== "number" || Number.isNaN(y)) {
    throw new NotNumberError(
      `y is not a number or is NaN. y: ${typeof y} = ${y}`
    );
  }

  Logger.log(`Calculating for (x, y) = (${x}, ${y})...`);

  return x + y;
};
