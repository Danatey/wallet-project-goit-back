const roundNumber = require("./roundNumber");

const countSummByCategories = (arr) => {
  return arr.reduce(
    (acc, { category, amount }) => ({
      ...acc,
      [category]: acc[category]
        ? roundNumber((acc[category] * 100 + amount * 100) / 100)
        : roundNumber(amount),
    }),
    {}
  );
};

module.exports = countSummByCategories;
