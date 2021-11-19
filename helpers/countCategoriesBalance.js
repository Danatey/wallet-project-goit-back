const countSummByCategories = (arr) => {
  return arr.reduce(
    (acc, { category, amount }) => ({
      ...acc,
      [category]: acc[category] ? acc[category] + amount : amount,
    }),
    {}
  );
};

module.exports = countSummByCategories;
