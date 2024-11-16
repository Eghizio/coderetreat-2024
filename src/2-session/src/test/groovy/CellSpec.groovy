import spock.lang.Specification

  class CellSpec extends Specification {

  def "should create Cell"() {
    given: "cell exists"
    int x = 2;
    int y = 4;
    Cell cell = new Cell(new Position(x, y))

    expect: "cell has position"
    cell.x == x
    cell.y == y
  }
}
