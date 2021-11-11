const Transaction = require("../model/transaction");

const addTransaction = async (body) => {
  const result = await Transaction.create(body);
  return result;
};

module.exports = {
  addTransaction,
};
