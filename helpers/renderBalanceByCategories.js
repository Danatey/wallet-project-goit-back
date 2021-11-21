const balanceByCategories = (arr, incomeArr) => {
  return arr.reduce(
    (acc, val) => [...acc, { name: val, value: incomeArr[val] || 0 }],
    []
  );
};

module.exports = balanceByCategories;
