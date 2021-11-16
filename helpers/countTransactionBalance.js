const countBalance = (type, balance, payload) =>
  type === "+" ? balance + payload : balance - payload;

module.exports = countBalance;
