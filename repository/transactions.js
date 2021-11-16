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
    sort: { date: "desc" },
  });
  const { docs: result } = results;
  delete results.docs;
  return { ...results, result };
};

const addTransaction = async (body) => {
  const result = await Transaction.create(body);
  return result;
};

// ????
// отримання транзакцій в проміжку часу.

const getTransactionsInRangeOfTime = async (userId, start_date, end_date) => {
  const result = await Contact.find({
    date: { $lte: new Date(start_date), $gte: new Date(end_date) },
    owner: userId,
  });
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
  getTransactionsInRangeOfTime,
};
