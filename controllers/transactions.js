const Transaction = require("../repository/transactions");
const { HttpCode } = require("../config/contants");

const createTransaction = async (req, res, next) => {
  const transaction = await Transaction.addTransaction({ ...req.body });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { transaction } });
};

const getTransactions = async (req, res) => {
  const data = await Transaction.listTransactions();
  res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
};

module.exports = { createTransaction, getTransactions };
