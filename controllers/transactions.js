const Transaction = require("../repository/transactions");
const { HttpCode } = require("../config/contants");

const createTransaction = async (req, res, next) => {
  const transaction = await Transaction.addTransaction({ ...req.body });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { transaction } });
};

const getTransactions = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const data = await Transaction.listTransactions(userId, req.query);
    const data = await Transaction.listTransactions();
    res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTransaction, getTransactions };
