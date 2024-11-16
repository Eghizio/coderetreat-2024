// Game -> Set<Cell<x, y>>

/*
    neighbours < 2      = dies
    neighbours == 2, 3  = survives
    neighbours > 3      = overpopulation (dies)
    neighbours == 3     = born
*/

export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  shouldSeppuku(cells) {
    const neigbours = cells.filter((cell) => {
      if (this.x === cell.x && this.y === cell.y) return false;

      const distanceX = Math.pow(this.x - cell.x, 2);
      const distanceY = Math.pow(this.y - cell.y, 2);

      if (distanceX > 1 || distanceY > 1) return false;

      return true;
    }).length;

    if (neigbours === 3) return;
    if (neigbours === 2) return;

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
