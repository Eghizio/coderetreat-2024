class Game(positions: List<Position>) {
    private val cells: HashSet<Position> = positions.toHashSet()

    fun getNeighboursCountForCell(cell: Position): Int {
        val positionsAround = setOf(
            cell.top(),
            cell.right(),
            cell.bottom(),
            cell.left(),
            cell.topRight(),
            cell.topLeft(),
            cell.bottomRight(),
            cell.bottomLeft()
        )

        return cells.intersect(positionsAround).size
    }
}

// interface GameCommand {
//    fun invoke(game: Game): Game
// }
//
// data class NeighboursCommand(val cell: Position, val cells: Set<Position>) : GameCommand {
//    override fun invoke(game: Game): Game {
//        return game
//    }
// }