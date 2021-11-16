const countBalance = (type, balance, payload) => {
  let transactionBalance;
  type === "+"
    ? (transactionBalance = balance + payload)
    : (transactionBalance = balance - payload);
};

module.exports = countBalance;
