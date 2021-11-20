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

const listTransactionsByDate = async (userId, query) => {
  const {
    limit = 5,
    page = 1,
    year = CurrentYear,
    month = CurrentMonth,
  } = query;
  const searchOptions = {
    owner: userId,
    year: year,
    month: month,
    query,
  };
  const results = await Transaction.paginate(searchOptions, {
    limit,
    page,
    year,
    month,
    sort: { date: "desc" },
  });
  const { docs: result } = results;
  delete results.docs;
  return { ...results, result };
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
  // const categoryBalance = transactions.reduce(
  //   (acc, { category, amount }) => ({
  //     ...acc,
  //     [category]: acc[category] ? acc[category] + amount : amount,
  //   }),
  //   {}
  // );
  const totalIncome = countSummByTypes(transactions, "+");
  const totalExpence = countSummByTypes(transactions, "-");
  // const totalIncome = transactions.reduce(
  //   (acc, { amount, type }) => (type === "+" ? acc + amount : acc),
  //   0
  // );
  // const totalExpence = transactions.reduce(
  //   (acc, { amount, type }) => (type === "-" ? acc + amount : acc),
  //   0
  // );

  const result = {
    ...categoryBalance,
    totalExpence: totalExpence,
    totalIncome: totalIncome,
  };
  return result;
};

module.exports = {
  addTransaction,
  listTransactions,
  listTransactionByCategories,
  listTransactionsByDate,
};
