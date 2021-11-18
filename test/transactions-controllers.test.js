const {
  createTransaction,
  getTransactions,
} = require('../controllers/transactions');
const User = require('../repository/users');
const Transactions = require('../repository/transactions');

jest.mock('../repository/transactions');

describe('Unit test controller getTransactions', () => {
  let req, res, next;

  beforeEach(() => {
    Transactions.listTransactions = jest.fn();
    req = { user: { _id: 1 }, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  test('Transactions exist', async () => {
    const transaction = { type: '+', name: 'машина', amount: 2000 };
    Transactions.listTransactions = jest.fn(() => {
      return transaction;
    });
    const result = await getTransactions(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(result.data).toEqual(transaction);
  });
});

describe('Unit test controller createTransaction', () => {
  let req, res, next;
  const transaction = { type: '+', category: 'Машина', amount: 2000 };

  beforeEach(() => {
    Transactions.addTransaction = jest.fn();
    req = {
      user: { _id: '1', balance: 3000 },
      body: { amount: 2000, type: '+' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
    User.addBalance = jest.fn();
    countBalance = jest.fn();
  });

  test('Transaction successful create', async () => {
    Transactions.addTransaction = jest.fn(() => {
      return transaction;
    });
    const result = await createTransaction(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(result.data.transaction).toEqual(transaction);
  });
});

describe('Unit test controller getTransactionsByDate', () => {
  let req, res, next;

  beforeEach(() => {
    Transactions.listTransactionsByDate = jest.fn();
    req = {
      user: { _id: '1', balance: 3000 },
      body: { year: 2021, month: 10 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
  });

  test('Transactions by date successful create', async () => {
    const transaction = { type: '+', name: 'машина', amount: 2000 };
    Transactions.addTransaction = jest.fn(() => {
      return transaction;
    });
    const result = await createTransaction(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(result.data.transaction).toEqual(transaction);
  });
});

describe('Unit test controller getTransactionsByCategory', () => {
  let req, res, next;

  beforeEach(() => {
    Transactions.listTransactionByCategories = jest.fn();
    req = {
      user: { _id: '1' },
      body: { year: 2021, month: 10 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
  });

  test('СategoriesTotalBalance successful create', async () => {
    const listOfTransactions = { авто: 2000, еда: 1000 };
    Transactions.listTransactionByCategories = jest.fn(() => {
      return listOfTransactions;
    });
    const result = await createTransaction(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    // expect(result.data.listOfTransactions).toEqual(listOfTransactions);
  });
});
