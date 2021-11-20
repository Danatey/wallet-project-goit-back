const balanceByCategories = (arr, incomeArr) => {
  return arr.reduce(
    (acc, val) => ({
      ...acc,
      [val]: incomeArr[val] || 0,
    }),
    {}
  );
};

module.exports = balanceByCategories;
