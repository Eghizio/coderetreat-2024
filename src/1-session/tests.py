import unittest
from unittest.mock import Mock
from game import Game

class TestGame(unittest.TestCase):

    def test_should_create_game_with_proper_dimensions(self):
        # Given
        width = 10
        height = 10

        # When
        game = Game(width, height)

        # Then
        self.assertEqual(game.width, width)
        self.assertEqual(game.height, height)

    def test_should_generate_game_board_with_proper_dimensions(self):
        # Given
        widths = [10, 420, 2137, 1337]
        heights = [10, 69, 7, 42]

        for width, height in zip(widths, heights):
            fields_count = width * height
            
            # When
            
            game = Game(width, height)

            # Then
            self.assertNotEqual(game.board, None)
            self.assertEqual(isinstance(game.board, (dict)), True)
            self.assertEqual(len(game.board), fields_count)

if __name__ == "__main__":
    unittest.main()
    # raise Exception("Not implemented")
