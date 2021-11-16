const Transaction = require("../repository/transactions");
const User = require("../repository/users");
const { HttpCode } = require("../config/contants");
const countBalance = require("../helpers/countTransactionBalance");

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

module.exports = { createTransaction, getTransactions };
