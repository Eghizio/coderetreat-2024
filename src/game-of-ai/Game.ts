// Game -> Set<Cell<x, y>>

/*
  neighbours <  2     = dies
  neighbours == 2, 3  = survives
  neighbours >  3     = overpopulation (dies)
  neighbours == 3     = born
*/

/* Methods are GPT.prompt() results. */
export class Cell {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}

export class Game {
  public cells: Set<Cell>;

  constructor(cells: Cell[]) {
    this.cells = new Set(cells);
  }

  toString() {
    const count = this.cells.size;
    const objects = Array.from(this.cells).join(", ");
    return `Set(${count}) { ${objects} }`;
  }
}
