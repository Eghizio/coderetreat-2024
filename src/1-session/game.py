class Game:
    board = None

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.board = self._generate_board(width, height)

    def _generate_board(self, width, height):
        board = {}

        for y in range(height):
            for x in range(width):
                key = self._hash_position(x, y)
                board[key] = None

        return board
    
    def _hash_position(self, x, y):
        return f"{x}-{y}"