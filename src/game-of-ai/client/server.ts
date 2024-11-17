import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { engine } from "express-handlebars";
import { Config } from "../Config.js";
import { Cell, Game } from "../Game.js";
import { GptFactory, OpenAiProvider } from "../OpenAi.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = new Config().PORT;

const app = express();

// Todo: Add cache, compiled/precompiled to template.
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "static"));

app.use("/styles.css", express.static(join(__dirname, "static", "styles.css")));
app.use("/script.js", express.static(join(__dirname, "static", "script.js")));

app.get("/", async (req, res) => {
  return res.render("index", { layout: false, generation: 0 });
});

// Todo: Add game id. On reset change id. And reset generation count on client.
const gameOfAi = new Game(
  Array.from({ length: 1_000 }, () => Cell.random()),
  GptFactory.forProvider(OpenAiProvider.OpenAi)
);

const resetCells = () => {
  console.log(`${new Date().toLocaleString()} Reseting cells...`);
  gameOfAi.cells = new Set(Array.from({ length: 1_000 }, () => Cell.random()));
  console.log(`(${gameOfAi.cells.size}) Cells after reset.`);
};

// Todo: Add aborting Ai generation onReset & onStop.
app.get("/api/v1/generation/reset", async (_, res) => {
  console.log(`${new Date().toLocaleString()} Reseting cells...`);
  resetCells();
  console.log(`(${gameOfAi.cells.size}) Cells after reset.`);

  res.sendStatus(200);
  return;
});

app.get("/api/v1/generation/stop", async (_, res) => {
  console.log(`${new Date().toLocaleString()} Stopping cells generation.`);
  gameOfAi.cells = new Set(Array.from({ length: 1_000 }, () => Cell.random()));

  res.sendStatus(200);
  return;
});

app.get("/api/v1/generation", async (_, res) => {
  console.log(`${new Date().toLocaleString()} Generating cells...`);
  const cells = await gameOfAi.nextGeneration();

  if (cells === null) {
    res.sendStatus(204); // 500 and graceful client handling?
    // res.render? interval?
    return;
  }

  console.log(`(${gameOfAi.cells.size}) Cells remaining.`);

  res.json(Array.from(cells));
  return;
});

app.listen(port, () =>
  console.log(`Client running at "http://localhost:${port}"`)
);
