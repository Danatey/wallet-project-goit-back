const Transaction = require('../repository/transactions');
const { HttpCode } = require('../config/constants');

const createTransaction = async (req, res, next) => {
  const transaction = await Transaction.addTransaction({ ...req.body });
  return res
    .status(HttpCode.CREATED)
    .json({ status: 'success', code: HttpCode.CREATED, data: { transaction } });
};

const getTransactions = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const data = await Transaction.listTransactions(userId, req.query);
    const data = await Transaction.listTransactions();
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...data },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createTransaction, getTransactions };
