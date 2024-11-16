import spock.lang.Specification

class GameSpec extends Specification implements GameFixture, CellFixture {

  def "should create Cell"() {
    given: "cell exists"
    int x = 2;
    int y = 4;
    Cell cell = new Cell(new Position(x, y))

    expect: "cell has position"
    cell.x == x
    cell.y == y
  }

  def "should generate Game board"() {
    given: "cells exists"
    Cell[] cells = [
      new Cell(new Position(0,0)),
      new Cell(new Position(1,1)),
      new Cell(new Position(42,1337)),
    ]

    when: "game is created"
    Game game = new Game(cells);

    then: "cells are added to the game board"
    game == firstGame
  }
}
