const express = require("express");
const path = require("path");
const { createClient } = require("redis");

const bodyParser = require("body-parser");
const { router } = require("./routes/fibonacci.router");

const pubClient = createClient({});

const app = express();
const PORT = 3040;
app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening  to the port ${PORT}`);
});
