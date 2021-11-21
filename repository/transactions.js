const Transaction = require("../model/transaction");
const { CurrentMonth, CurrentYear } = require("../config/constants");
const countSummByTypes = require("../helpers/countSummByTransactionType");
const countCategoriesBalance = require("../helpers/countCategoriesBalance");

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

const listTransactionByCategories = async (
  userId,
  year = CurrentYear,
  month = CurrentMonth
) => {
  const transactions = await Transaction.find({
    owner: userId,
    year: year,
    month: month,
  });
  const categoryBalance = countCategoriesBalance(transactions);
  const totalIncome = countSummByTypes(transactions, "+");
  const totalExpence = countSummByTypes(transactions, "-");

  const result = {
    category: { ...categoryBalance },
    total: { Расходы: totalExpence, Доходы: totalIncome },
  };
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
  listTransactionByCategories,
};
