const { createClient } = require("redis");
const client = createClient({
  url: "redis://redis",
  port: 6379,
});

const setFibonacci = async (ticket, fibonacci) => {
  await client.hSet("numbers", ticket, fibonacci);
};

const getFibonacciFromRedis = async (ticket) => {
  return await client.hGet("numbers", ticket);
};
module.exports = { client, setFibonacci, getFibonacciFromRedis };
