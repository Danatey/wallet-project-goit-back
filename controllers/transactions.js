const Transaction = require("../repository/transactions");
const User = require("../repository/users");
const { HttpCode } = require("../config/contants");
const countBalance = require("../helpers/countTransactionBalance");

// :DELETE after category schema will be created
const { TransactionsCategory } = require("../config/contants");

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
    res.status(HttpCode.CREATED).json({
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
    res.json({ status: "success", code: HttpCode.OK, data: data });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { year, month } = req.body;

    const data = await Transaction.listTransactionsByDate(
      userId,
      req.query,
      year,
      month
    );
    res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByCategory = async (req, res) => {
  const userId = req.user._id;
  const { year, month } = req.body;

  const categoriesBalances = await Transaction.listTransactionByCategories(
    userId,
    year,
    month
  );
  const categoriesTotalBalance = TransactionsCategory.reduce(
    (acc, val) => ({
      ...acc,
      [val]: categoriesBalances[val] || 0,
    }),
    {}
  );

  res.status(HttpCode.OK).json({
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
