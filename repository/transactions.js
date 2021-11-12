const Transaction = require("../model/transaction");

const listTransactions = async () => {
  const results = await Transaction.find({});
  return results;
};

const addTransaction = async (body) => {
  const result = await Transaction.create(body);
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
};
