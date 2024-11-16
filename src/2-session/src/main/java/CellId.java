import java.util.Objects;

public class CellId {
    String id;

    public CellId(int x, int y) {
        this.id = x + "-" + y;
    }

    public String getId() {
        return this.id;
    }

    @Override
    public String toString() {
        return "CellId{" +
                "id='" + id + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CellId cellId = (CellId) o;
        return Objects.equals(id, cellId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
