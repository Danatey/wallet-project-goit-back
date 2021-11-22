const balanceByCategories = require('../helpers/renderBalanceByCategories');
const {
  TransactionsCategoryExpance,
  TransactionsCategoryIncome,
} = require('../config/constants');

const allBalanceByCategories = {
  Продукты: 150,
  Машина: 0,
  'Забота о себе': 1000,
  'Забота о детях': 0,
  'Товары для дома': 300,
  Образование: 0,
  Досуг: 0,
  'Другие расходы': 0,
  'Регулярный доход': 1600,
  'Не регулярный доход': 500,
};

describe('Unit test function balanceByCategories', () => {
  test('Expected expanse categories', () => {
    expect(
      balanceByCategories(TransactionsCategoryExpance, allBalanceByCategories)
    ).toHaveLength(8);
    expect(
      balanceByCategories(TransactionsCategoryExpance, allBalanceByCategories)
    ).toBeDefined();
  });

  test('Expected expanse categories', () => {
    expect(
      balanceByCategories(TransactionsCategoryIncome, allBalanceByCategories)
    ).toHaveLength(2);
    expect(
      balanceByCategories(TransactionsCategoryIncome, allBalanceByCategories)
    ).toBeDefined();
  });
});

const countSumByTypes = require('../helpers/countSummByTransactionType');
const transactions = [
  {
    amount: 700,
    type: '-',
    category: 'Машина',
    date: '2021-02-01',
    balance: 50,
    owner: '61994b7dc2b3164f924883cc',
    createdAt: '2021-11-20T19:26:46.106Z',
    updatedAt: '2021-11-20T19:26:46.106Z',
    year: 2021,
    month: 2,
    id: '61994bf6c2b3164f924883dc',
  },
  {
    amount: 50,
    type: '-',
    category: 'Продукты',
    date: '2021-02-01',
    balance: 0,
    owner: '61994b7dc2b3164f924883cc',
    createdAt: '2021-11-20T19:27:14.635Z',
    updatedAt: '2021-11-20T19:27:14.635Z',
    year: 2021,
    month: 2,
    id: '61994c12c2b3164f924883e0',
  },
  {
    amount: 600,
    type: '+',
    category: 'Регулярный доход',
    date: '2021-02-01',
    balance: 500,
    owner: '61994b7dc2b3164f924883cc',
    createdAt: '2021-11-20T19:27:38.034Z',
    updatedAt: '2021-11-20T19:27:38.034Z',
    year: 2021,
    month: 2,
    id: '61994c2ac2b3164f924883e4',
  },
  {
    amount: 500,
    type: '+',
    category: 'Регулярный доход',
    date: '2021-02-01',
    balance: 1000,
    owner: '61994b7dc2b3164f924883cc',
    createdAt: '2021-11-20T19:37:20.178Z',
    updatedAt: '2021-11-20T19:37:20.178Z',
    year: 2021,
    month: 2,
    id: '61994e70df4763ac4010ed06',
  },
];

describe('Unit test function countSumByCategoriesTypes', () => {
  test('Expected total count by type "+"', () => {
    expect(countSumByTypes(transactions, '+')).toBe(1100);
    expect(countSumByTypes(transactions, '+')).toBeDefined();
  });

  test('Expected total count by type "-"', () => {
    expect(countSumByTypes(transactions, '-')).toBe(750);
    expect(countSumByTypes(transactions, '-')).toBeDefined();
  });
});

const countBalance = require('../helpers/countTransactionBalance');

describe('Unit test function countBalance', () => {
  test('Expected total count by type "+"', () => {
    expect(countBalance('+', 2000, 500)).toBe(2500);
    expect(countBalance('+', 2000, 500)).toBeDefined();
    expect(countBalance('+', 2000, 500)).toBeGreaterThan(2000);
  });

  test('Expected total count by type "-"', () => {
    expect(countBalance('-', 2000, 300)).toBe(1700);
    expect(countBalance('-', 2000, 300)).toBeDefined();
    expect(countBalance('-', 2000, 300)).toBeLessThan(2000);
  });
});

const countCategoriesBalance = require('../helpers/countCategoriesBalance');

describe('Unit test function countCategoriesBalance', () => {
  test('Expected total amount by categories', () => {
    expect(countCategoriesBalance(transactions)).toBeDefined();
    expect(countCategoriesBalance(transactions)).toHaveProperty('Машина', 700);
    expect(countCategoriesBalance(transactions)).toHaveProperty('Продукты', 50);
    expect(countCategoriesBalance(transactions)).toHaveProperty(
      'Регулярный доход',
      1100
    );
  });
});
