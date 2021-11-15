const Transaction = require("../model/transaction");

const listTransactions = async (userId, query) => {
  // const results = await Transaction.find({});
  // return results;
  // };
  const { limit = 5, page = 1 } = query;
  const searchOptions = { owner: userId };
  const results = await Transaction.paginate(searchOptions, {
    limit,
    page,
  });
  const { docs: transactions } = results;
  delete results.docs;
  return { ...results, transactions };
};

const addTransaction = async (body) => {
  const result = await Transaction.create(body);
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
};
