import java.util.Objects;

public class Cell {
    final private Position position;

    public Cell(Position position) {
        this.position = position;
    }

    public int getX() {
        return this.position.getX();
    }

    public int getY() {
        return this.position.getY();
    }

    @Override
    public String toString() {
        return "Cell{" +
                "position=" + position +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cell cell = (Cell) o;
        return Objects.equals(position, cell.position);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(position);
    }
}
