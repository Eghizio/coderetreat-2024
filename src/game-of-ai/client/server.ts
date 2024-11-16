import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { engine } from "express-handlebars";
import { Config } from "../Config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = new Config().PORT;

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname);

app.use("/styles.css", express.static("./client/styles.css"));

app.get("/", async (req, res) => {
  return res.render("index", { layout: false, generation: 0 });
});

app.listen(port, () =>
  console.log(`Client running at "http://localhost:${port}"`)
);
