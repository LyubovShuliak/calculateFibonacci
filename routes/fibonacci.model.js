const { setFibonacci, getFibonacciFromRedis } = require("../redis.service");

const mul = ([[a1, a2], [a3, a4]], [[b1, b2], [b3, b4]]) => [
  [a1 * b1 + a2 * b3, a1 * b2 + a2 * b4],
  [a3 * b1 + a4 * b3, a3 * b2 + a4 * b4],
];

const matrix = [
  [BigInt(0), BigInt(1)],
  [BigInt(1), BigInt(1)],
];

const id = [
  [BigInt(1), BigInt(0)],
  [BigInt(0), BigInt(1)],
];

const fibon = (n) => {
  let result = id;
  const bits = n.toString(2);

  for (const bit of bits) {
    result = mul(result, result);
    if (bit == "1") {
      result = mul(result, matrix);
    }
  }
  return result[1][0].toString();
};

async function putFibonacci(ticket, index) {
  await setFibonacci(ticket, fibon(index));

  return { ticket };
}

async function getFibonacci(ticket) {
  const fibonacci = await getFibonacciFromRedis(ticket);

  if (!fibonacci) {
    return { error: "not found" };
  }

  return { fibonacci };
}

module.exports = {
  putFibonacci,
  getFibonacci,
};
