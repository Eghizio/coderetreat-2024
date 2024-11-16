import unittest
from unittest.mock import Mock
from implementation import Logger, NotNumberError, calculate

class TestCalculate(unittest.TestCase):
    results = [
        (42, 2, 44),
        (42, -2, 40),
        (-42, 42, 0),
        (-42, -2, -44),
        (0, 0, 0),
    ]

    invalid_values = [
        "42",
        "",
        "foo",
        float("nan"),
        # True,
        None,
        {},
        [],
        lambda: None
    ]
    
    def setUp(self):
        self.logger_mock = Mock()
        Logger.log = self.logger_mock

    def tearDown(self):
        self.logger_mock.reset_mock()

    def test_invalid_x(self):
        y = 42

        for x in self.invalid_values:
            with self.assertRaises(NotNumberError):
                calculate(x, y)

    def test_invalid_y(self):
        x = 42

        for y in self.invalid_values:
            with self.assertRaises(NotNumberError):
                calculate(x, y)

    def test_valid_inputs(self):
        for x, y, expected in self.results:
            self.assertEqual(calculate(x, y), expected)

    def test_logger_called(self):
        for x, y, _ in self.results:
            calculate(x, y)
            self.logger_mock.assert_called_once_with(f"Calculating for (x, y) = ({x}, {y})...")
            self.logger_mock.reset_mock()


if __name__ == "__main__":
    unittest.main()
