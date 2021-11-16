const {
  createTransaction,
  getTransactions,
} = require('../controllers/transactions');
const Transactions = require('../repository/transactions');

jest.mock('../repository/transactions');

describe('Unit test controller getTransactions', () => {
  let req, res, next;

  beforeEach(() => {
    Transactions.listTransactions = jest.fn();
    req = { user: { _id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  test('Transactions exist', async () => {
    const transaction = { type: '+', name: 'Simon', age: 4 };
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

  // test('Don"t have any transactions', async () => {
  //   const result = await getTransactions(req, res, next);
  //   console.log('result: ', result);
  //   await expect(result).rejects.toEqual(next);
  // });
});

describe('Unit test controller createTransaction', () => {
  let req, res, next;
  const transaction = { type: '+', category: 'Машина', amount: 2000 };

  beforeEach(() => {
    Transactions.addTransaction = jest.fn();
    req = { user: { _id: 1 }, body: { ...transaction } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
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

  // test('Don"t have any transactions', async () => {
  //   const result = await getTransactions(req, res, next);
  //   console.log('result: ', result);
  //   await expect(result).rejects.toEqual(next);
  // });
});
