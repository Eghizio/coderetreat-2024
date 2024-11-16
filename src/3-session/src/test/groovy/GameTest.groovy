import spock.lang.Specification

class GameTest extends Specification {

    def setup() {

    }

    def "should xyz"() {
        given: "game with cells"
        Position[] cells = [
            new Position(0, 0),
            new Position(1, 2),
            new Position(42, 1337),
        ]
        Game game = new Game(cells)

        expect: "game contains appropriate amount of cells"
        game.cells.size() == 3
    }
}
