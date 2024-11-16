import unittest
from unittest.mock import Mock
from game import Game

class TestGame(unittest.TestCase):

    def test_should_generate_game_with_proper_dimensions(self):
        # Given
        width = 10
        height = 10

        # When
        game = Game(width, height)

        # Then
        self.assertEqual(game.width, width)
        self.assertEqual(game.height, height)


if __name__ == "__main__":
    unittest.main()
