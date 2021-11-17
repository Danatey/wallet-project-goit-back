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

const listTransactionsByDate = async (userId, query, year, month) => {
  const { limit = 5, page = 1 } = query;
  const searchOptions = {
    owner: userId,
    year: year,
    month: month,
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

const listTransactionByCategories = async (userId, year, month) => {
  const transactions = await Transaction.find({
    owner: userId,
    year: year,
    month: month,
  });
  console.log(`transactions`, transactions);
  const categoryBalance = transactions.reduce(
    (acc, { category, amount, type }) => ({
      ...acc,
      [category]:
        acc[category] && type === "+"
          ? acc[category] + amount
          : acc[category] && type === "-"
          ? acc[category] - amount
          : !acc[category] && type === "-"
          ? -amount
          : amount,
    }),
    {}
  );

  return categoryBalance;
};

module.exports = {
  addTransaction,
  listTransactions,
  listTransactionByCategories,
  listTransactionsByDate,
};
