console.log("Hello there");

// const getCells = () => {
//   return fetch("/api/v1/generation")
//     .then(async (response) => {
//       if (response.status === 204) {
//         console.log("No cells for the moment.");
//         return;
//       }
//       const cells = await response.json();
//       console.log(cells);
//       console.log(JSON.stringify(cells));
//     })
//     .catch(console.error);
// };

// const exampleCells = [
//   { x: 77, y: 17 },
//   { x: 78, y: 18 },
//   { x: 78, y: 16 },
//   { x: 77, y: 15 },
//   { x: 100, y: 143 },
//   { x: 100, y: 145 },
//   { x: 157, y: 118 },
//   { x: 154, y: 117 },
//   { x: 60, y: 279 },
//   { x: 60, y: 281 },
//   { x: 172, y: 112 },
//   { x: 171, y: 111 },
//   { x: 195, y: 120 },
//   { x: 197, y: 120 },
//   { x: 196, y: 117 },
//   { x: 274, y: 1 },
//   { x: 11, y: 136 },
//   { x: 11, y: 137 },
//   { x: 191, y: 152 },
//   { x: 192, y: 152 },
//   { x: 32, y: 165 },
//   { x: 11, y: 141 },
//   { x: 11, y: 142 },
//   { x: 40, y: 162 },
//   { x: 108, y: 86 },
//   { x: 77, y: 44 },
//   { x: 242, y: 172 },
//   { x: 270, y: 3 },
//   { x: 190, y: 121 },
//   { x: 3, y: 19 },
//   { x: 3, y: 121 },
//   { x: 11, y: 138 },
//   { x: 78, y: 239 },
//   { x: 11, y: 135 },
//   { x: 93, y: 288 },
//   { x: 289, y: 204 },
//   { x: 8, y: 7 },
// ];

const GAME_SIZE = 300; /* 0-300 */
const CELL_SIZE = 10;

const canvas = document.querySelector("canvas#game");
canvas.width = GAME_SIZE * CELL_SIZE;
canvas.height = GAME_SIZE * CELL_SIZE;
const ctx = canvas.getContext("2d", { willReadFrequently: true });
ctx.fillStyle = "red";

const clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
};

const drawCell = ({ x, y }, cellSize = CELL_SIZE) => {
  ctx.fillStyle = "red";
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

const renderCells = (cells) => {
  /* This could be done on server. Or be adjusted in the prompt. */
  const displayedCells = cells.filter(
    ({ x, y }) => (x >= 0 || x <= GAME_SIZE) && (y >= 0 || y <= GAME_SIZE)
  );

  clearCanvas();
  displayedCells.forEach((cell) => drawCell(cell));
};

// renderCells(exampleCells);

const getCells = async () => {
  try {
    const response = await fetch("/api/v1/generation");

    if (response.status === 204) {
      console.log("No cells for the moment.");
      return;
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const resetGame = async () => {
  console.log("Reseting game...");
  return fetch("/api/v1/generation/reset").catch(console.error);
};
document.querySelector("#reset").addEventListener("click", resetGame);

const generationCounter = document.querySelector("#generation");
const updateGenerationCount = () => {
  const generation = parseInt(generationCounter.textContent, 10);
  generationCounter.textContent = generation + 1;
};

const cellsCounter = document.querySelector("#cells-count");
const updateCellsCount = (cellsCount) => {
  cellsCounter.textContent = cellsCount;
};

const interval = setInterval(async () => {
  const cells = await getCells();

  console.log({ cells });

  if (!cells) return;

  renderCells(cells);
  updateGenerationCount();
  updateCellsCount(cells.length);

  if (cells.length < 0) {
    clearInterval(interval);
  }
}, 7_500);

const killGame = () => {
  clearInterval(interval);
  console.log("Game killed.");
};
document.querySelector("#stop").addEventListener("click", killGame);
