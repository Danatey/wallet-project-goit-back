const countSummByTypes = (arr, typeTransaction) => {
  return arr.reduce(
    (acc, { amount, type }) => (type === typeTransaction ? acc + amount : acc),
    0
  );
};

module.exports = countSummByTypes;
