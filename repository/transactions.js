const Transaction = require("../model/transaction");

const listTransactions = async (userId, query) => {
  const results = await Transaction.find({});
  return results;
};

const addTransaction = async (body) => {
  // take summary balance and id of user
  // const userBalance = req.user.balance;
  //  const userId = req.user._id;

  const result = await Transaction.create(body);
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
};
