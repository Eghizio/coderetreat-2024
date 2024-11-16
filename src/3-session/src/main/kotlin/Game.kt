class Game(positions: List<Position>) {
    private val cells: HashSet<Position> = positions.toHashSet()

    fun getNeighboursCountForCell(cell: Position): Int {
        return -1
    }
}

//interface GameCommand {
//    fun invoke(game: Game): Game
//}
//
//data class GetNeighboursCommand(val cell: Position, val cells: Set<Position>) : GameCommand {
//    override fun invoke(game: Game): Game {
//        return game
//    }
//}