const countSummByTypes = (arr, typeTransaction) => {
  return arr.reduce(
    (acc, { amount, type }) =>
      type === typeTransaction ? (acc * 100 + amount * 100) / 100 : acc,
    0
  );
};

module.exports = countSummByTypes;
