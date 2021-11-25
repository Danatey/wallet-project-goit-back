const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/db');
const app = require('../app');
const Transaction = require('../model/transaction');
const { User } = require('../model/user');
const { newUserForRouteTransactions, newTransaction } = require('./data/data');
const {
  TransactionsCategoryExpance,
  TransactionsCategoryIncome,
} = require('../config/constants');
const { HttpCode } = require('../config/constants');

describe('Test route transactions', () => {
  let user, accessToken;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteTransactions.email });
    user = await User.create(newUserForRouteTransactions);
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    accessToken = issueToken({ id: user._id }, SECRET_KEY);
    await User.updateOne({ _id: user._id }, { accessToken });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteTransactions.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Transaction.deleteMany({});
  });

  describe('GET request', () => {
    test('should return status 200 get all transactions', async () => {
      const response = await request(app)
        .get('/api/transactions')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body.data.result).toBeInstanceOf(Array);
    });
  });

  describe('POST request', () => {
    test('should return status 201 create transaction', async () => {
      const response = await request(app)
        .post('/api/transactions/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newTransaction)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(HttpCode.CREATED);
      expect(response.body).toBeDefined();
    });

    test('should return error when request do not have all parameters', async () => {
      next = jest.fn(() => err);
      const response = await request(app)
        .post('/api/transactions/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(HttpCode.BAD_REQUEST);
    });
  });

  describe('GET all categories list', () => {
    test('should return all categories list', async () => {
      const response = await request(app)
        .get('/api/transactions/list')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body.data.expenses).toEqual(TransactionsCategoryExpance);
      expect(response.body.data.incomes).toEqual(TransactionsCategoryIncome);
    });
  });

  describe('GET transactions by category', () => {
    test('should return info about all transactions by category', async () => {
      const response = await request(app)
        .get('/api/transactions/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body.data.data).toBeDefined();
      expect(response.body.data.sumIncome).toBeDefined();
    });
  });
});
