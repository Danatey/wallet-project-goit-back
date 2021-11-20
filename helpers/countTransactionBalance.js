const countBalance = (type, balance, payload) =>
  type === "+"
    ? (balance * 100 + payload * 100) / 100
    : (balance * 100 - payload * 100) / 100;

module.exports = countBalance;
