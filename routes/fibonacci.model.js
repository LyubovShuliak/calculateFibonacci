const { setFibonacci, getFibonacciFromRedis } = require("../redis.service");

const path = require("path");
function fib(n = 1000) {
  let a = BigInt(1);
  let b = BigInt(1);
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b.toString();
}

async function putFibonacci(ticket, index) {
  await setFibonacci(ticket, fib(index));
  return { ticket };
}

async function getFibonacci(ticket) {
  const fibonacci = await getFibonacciFromRedis(ticket);
  console.log("fib", fibonacci);

  if (!fibonacci) {
    return { error: "not found" };
  }

  return { fibonacci };
}

module.exports = {
  putFibonacci,
  getFibonacci,
};
