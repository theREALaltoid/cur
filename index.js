const express = require("express"),
  http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;
const assetRouter = require("../routes/asset");

const app = express();
const bodyParser = require("body-parser");

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  app.use(bodyParser.json());
  app.use("/asset", assetRouter);

  console.log(`Server running at http://${hostname}:${port}/`);
});
