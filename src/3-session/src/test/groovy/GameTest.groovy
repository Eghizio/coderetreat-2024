import spock.lang.Specification

class GameTest extends Specification {

    def setup() {

    }

    def "should initialize game with amount of cells"() {
        given: "game with cells"
        List<Position> cells = [
            new Position(0, 0),
            new Position(1, 2),
            new Position(42, 1337),
        ]
        Game game = new Game(cells)

        expect: "game contains appropriate amount of cells"
        game.cells.size() == 3
    }

    def "should get count of neighbours for cell"() {
        given: "we have cells"
        Position neighbour1 = new Position(0, 0)
        Position neighbour2 = new Position(1, 0)
        Position loneCell = new Position(42, 1337)

        and:
        List<Position> cells = [neighbour1, neighbour2, loneCell]
        Game game = new Game(cells)

        then:
        def count1 = game.getNeighboursCountForCell(neighbour1)
        def count2 = game.getNeighboursCountForCell(neighbour2)
        def count3 = game.getNeighboursCountForCell(loneCell)

        expect:
        count1 == 1
        count2 == 1
        count3 == 0
    }
}
