const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

async function getData() {
  const data = await readFile(
    path.join(__dirname, "fibonacciList.json"),
    "utf8"
  );
  if (!data) return {};
  return JSON.parse(data);
}

async function putFibonacci(ticket, index) {
  let tickets = await getData();

  console.log(fib(index));

  const newAssign = Object.assign(tickets, { [ticket]: fib(index) });

  writeFile(
    path.join(__dirname, "fibonacciList.json"),
    JSON.stringify(newAssign)
  );
  return { ticket };
}

async function getFibonacci(ticket) {
  let tickets = await getData();

  const fibonacci = tickets[ticket];

  if (!fibonacci) {
    return { error: "not found" };
  }

  return { fibonacci };
}

module.exports = {
  putFibonacci,
  getFibonacci,
};
