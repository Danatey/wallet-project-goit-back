const roundNumber = require("./roundNumber");
const countBalance = (type, balance, payload) =>
  type === "+"
    ? roundNumber((balance * 100 + payload * 100) / 100)
    : roundNumber((balance * 100 - payload * 100) / 100);

module.exports = countBalance;
