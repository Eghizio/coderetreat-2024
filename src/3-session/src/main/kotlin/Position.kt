data class Position(val x: Int, val y: Int) {
    // top is up.
    fun top() = Position(x, y+1)
    fun right() = Position(x+1, y)
    fun bottom() = Position(x, y-1)
    fun left() = Position(x-1, y)
    fun topRight() = Position(x+1, y+1)
    fun topLeft() = Position(x-1, y+1)
    fun bottomRight() = Position(x+1, y-1)
    fun bottomLeft() = Position(x-1, y-1)
}