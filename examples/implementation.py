class NotNumberError(Exception):
    def __init__(self, message="Not a number!"):
        super().__init__(message)


class Logger:
    @staticmethod
    def log(message):
        print(message)


def calculate(x, y):
    if not isinstance(x, (int, float)) or x != x:  # x != x checks for NaN
        raise NotNumberError(f"x is not a number or is NaN. x: {type(x)} = {x}")
    if not isinstance(y, (int, float)) or y != y:  # y != y checks for NaN
        raise NotNumberError(f"y is not a number or is NaN. y: {type(y)} = {y}")
    Logger.log(f"Calculating for (x, y) = ({x}, {y})...")
    return x + y