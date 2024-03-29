const Transaction = require('../repository/transactions');
const User = require('../repository/users');
const {
  HttpCode,
  TransactionsCategoryExpance,
  TransactionsCategoryIncome,
  ExpenseBalanceName,
  IncomeBalanceName,
} = require('../config/constants');
const countBalance = require('../helpers/countTransactionBalance');
const balanceByCategories = require('../helpers/renderBalanceByCategories');

const createTransaction = async (req, res, next) => {
  try {
    const { _id: userId, balance } = req.user;
    const { amount, type } = req.body;
    const amountNumber = Number(amount);

    const transactionBalance = countBalance(type, balance, amountNumber);

    await User.addBalance(userId, transactionBalance);

    const transaction = await Transaction.addTransaction({
      ...req.body,
      owner: userId,
      balance: transactionBalance,
    });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
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
      status: 'success',
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
  const transactionsWithBalance = [...TransactionsCategoryExpance];
  const transactionsTotal = [ExpenseBalanceName, IncomeBalanceName];
  const categoriesBalance = balanceByCategories(
    transactionsWithBalance,
    categoriesBalances.category
  );

  const totalBalance = balanceByCategories(
    transactionsTotal,
    categoriesBalances.total
  );

  return res.status(HttpCode.OK).json({
    status: 'OK',
    code: HttpCode.OK,
    data: { data: categoriesBalance, sumIncome: totalBalance },
  });
};

const getCategoriesList = (req, res) => {
  return res.status(HttpCode.OK).json({
    status: 'OK',
    code: HttpCode.OK,
    data: {
      expenses: TransactionsCategoryExpance,
      incomes: TransactionsCategoryIncome,
    },
  });
};
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsByCategory,
  getCategoriesList,
};
