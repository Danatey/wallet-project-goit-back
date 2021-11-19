const Transaction = require("../repository/transactions");
const User = require("../repository/users");
const { HttpCode } = require("../config/constants");
const countBalance = require("../helpers/countTransactionBalance");

// :DELETE after category schema will be created
const { TransactionsCategory } = require("../config/constants");

const createTransaction = async (req, res, next) => {
  try {
    const { _id: userId, balance } = req.user;
    const { amount, type } = req.body;
    const amountNumber = parseInt(amount);

    const transactionBalance = countBalance(type, balance, amountNumber);

    await User.addBalance(userId, transactionBalance);

    const transaction = await Transaction.addTransaction({
      ...req.body,
      owner: userId,
      balance: transactionBalance,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { transaction },
    });
  } catch (err) {
    next(err);
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Transaction.listTransactions(userId, req.query);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { ...data },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    // const { year, month } = req.body;

    const data = await Transaction.listTransactionsByDate(userId, req.query);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { ...data },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByCategory = async (req, res) => {
  const userId = req.user._id;
  const { year, month } = req.query;
  const categoriesBalances = await Transaction.listTransactionByCategories(
    userId,
    year,
    month
  );
  const transactionsWithBalance = [
    ...TransactionsCategory,
    "totalIncome",
    "totalExpence",
  ];
  const categoriesTotalBalance = transactionsWithBalance.reduce(
    (acc, val) => ({
      ...acc,
      [val]: categoriesBalances[val] || 0,
    }),
    {}
  );

  return res.status(HttpCode.OK).json({
    status: "OK",
    code: HttpCode.OK,
    data: categoriesTotalBalance,
  });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsByDate,
  getTransactionsByCategory,
};
