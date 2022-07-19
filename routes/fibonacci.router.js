const express = require("express");
const { v4: uuid4 } = require("uuid");

const { putFibonacci, getFibonacci } = require("./fibonacci.model");

const router = express.Router();

router.post("/input", async (req, res) => {
  const number = req.body.number;
  const ticket = await putFibonacci(uuid4(), number);
  return res.status(200).json(ticket);
});

router.get("/output/:id", async (req, res) => {
  const ticket = req.params.id;
  const fibonacci = await getFibonacci(ticket);
  if (fibonacci.error) {
    return res.status(404).send(fibonacci.error);
  }
  return res.status(200).json(fibonacci);
});

module.exports = { router };
