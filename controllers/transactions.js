const Transaction = require("../repository/transactions");
const { HttpCode } = require("../config/contants");

const createTransaction = async (req, res, next) => {
  const transaction = await Transaction.addTransaction({ ...req.body });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { transaction } });
};

module.exports = { createTransaction };
