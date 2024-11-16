// Game -> Set<Cell<x, y>>

/*
    neighbours < 2      = dies
    neighbours == 2, 3  = survives
    neighbours > 3      = overpopulation (dies)
    neighbours == 3     = born
*/

export class Cell {
  constructor(x, y) {}

  shouldSeppuku(cells) {
    const neigbours = cells.length;
    if (neigbours === 3) return;

    cells.pop();
  }
}

export class Game {
  constructor(cells) {
    this.cells = cells;
  }

  next() {
    this.cells = [];
  }
}
