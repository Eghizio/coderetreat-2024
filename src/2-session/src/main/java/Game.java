import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Game {
    private Map<CellId, Cell> cells;

    public Game(Cell[] cells) {
        this.cells = new HashMap<>();
        for (Cell cell : cells) {
            this.cells.put(new CellId(cell.getX(), cell.getY()), cell);
        }
    }

    @Override
    public String toString() {
        return "Game{" +
                "cells=" + cells +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Game game = (Game) o;
        return Objects.equals(cells, game.cells);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(cells);
    }
}
