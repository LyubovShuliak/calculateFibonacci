const express = require("express");
const { client } = require("./redis.service");
var os = require("os");
const bodyParser = require("body-parser");
const { router } = require("./routes/fibonacci.router");

client.connect();
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", async () => {
  await client.set("visits", 0);
  console.log("Redis Client Connected");
});

const app = express();
const PORT = 3040;
app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);
app.get("/*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, async () => {
  // await pubClient.connect();

  console.log(`Listening  to the port ${os.hostname() + ":" + PORT}`);
});
