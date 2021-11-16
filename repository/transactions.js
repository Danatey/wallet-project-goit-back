const Transaction = require("../model/transaction");

const listTransactions = async (userId, query) => {
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

const getTransactionsInRangeOfTime = async (
  userId,
  query,
  start_date,
  end_date
) => {
  const { limit = 5, page = 1 } = query;
  const searchOptions = {
    owner: userId,
    date: { $gte: start_date, $lte: end_date },
  };

  const results = await Transaction.paginate(searchOptions, {
    limit,
    page,
    sort: { date: "desc" },
  });
  const { docs: result } = results;
  delete results.docs;
  return { ...results, result };
};

const getTransactionsOfFullYear = async (userId, query, year) => {
  const { limit = 5, page = 1 } = query;
  const searchOptions = {
    owner: userId,
    year: year,
  };
  const results = await Transaction.paginate(searchOptions, {
    limit,
    page,
    sort: { date: "desc" },
  });
  const { docs: result } = results;
  delete results.docs;
  return { ...results, result };
};

module.exports = {
  addTransaction,
  listTransactions,
  getTransactionsInRangeOfTime,
  getTransactionsOfFullYear,
};
