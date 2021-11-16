const Category = require("../repository/categories");
const { HttpCode } = require("../config/contants");
const countBalance = require("../helpers/countTransactionBalance");
const monthCounter = require("../helpers/monthCounter");
const yearCounter = require("../helpers/yearCounter");

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
    res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByMonth = async (req, res) => {
  try {
    const userId = req.user._id;
    const monthRange = monthCounter(req.body.date);

    const data = await Transaction.getTransactionsInRangeOfTime(
      userId,
      req.query,
      monthRange[0],
      monthRange[1]
    );
    res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
  } catch (err) {
    console.log(err.message);
  }
};

const getTransactionsByYear = async (req, res) => {
  try {
    const userId = req.user._id;
    const requestYear = yearCounter(req.body.date);

    const data = await Transaction.getTransactionsOfFullYear(
      userId,
      req.query,
      requestYear
    );
    res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getCategoriesList,
  addCategory,
};
