const roundNumber = require("./roundNumber");

const countSummByTypes = (arr, typeTransaction) => {
  return arr.reduce(
    (acc, { amount, type }) =>
      type === typeTransaction
        ? roundNumber((acc * 100 + amount * 100) / 100)
        : roundNumber(acc),
    0
  );
};

module.exports = countSummByTypes;
