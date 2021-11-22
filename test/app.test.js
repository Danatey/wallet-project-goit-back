const request = require('supertest');

require('dotenv').config();

const app = require('../app');
const db = require('../config/db');
const { HttpCode } = require('../config/constants');

const { User } = require('../model/user');
const Users = require('../repository/users');

const {
  newUserForRouteUser,
  newUserForRouteTransactions,
  newTransaction,
} = require('./data/data');

describe('Unit test for user"s router', () => {
  let accessToken, refreshToken;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
    await mongo.disconnect();
  });

  test('Register user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(newUserForRouteUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.CREATED);
    expect(response.body).toBeDefined();
  });

  test('Register user with bad request', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send()
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.BAD_REQUEST);
    expect(response.body).toBeDefined();
  });

  test('Login user with bad request', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send()
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.BAD_REQUEST);
    expect(response.body).toBeDefined();
  });

  test('Login user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteUser)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
    accessToken = response.body.data.access_token;
    refreshToken = response.body.data.refresh_token;
  });

  test('Current user', async () => {
    const response = await request(app)
      .get('/api/users/info')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
  });

  test('Logout user', async () => {
    const response = await request(app)
      .post('/api/users/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application|json');

    expect(response.status).toBeDefined();
  });

  test('Refresh tokens, user NOT exist', async () => {
    const response = await request(app)
      .post('/api/users/refresh-tokens')
      .send(refreshToken)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.UNAUTORIZED);
    expect(response.body).toBeDefined();
  });

  test('Refresh tokens, user exist', async () => {
    const user = { refreshToken: refreshToken };
    Users.findByRefreshToken = jest.fn(() => refreshToken);
    const response = await request(app)
      .post('/api/users/refresh-tokens')
      .send(user.refreshToken)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
  });

  test('login when user not exist', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteTransactions)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.UNAUTORIZED);
    expect(response.body).toBeDefined();
  });

  test('More login requests', async () => {
    const responseThree = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteUser)
      .set('Accept', 'application|json');

    const responseFour = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteUser)
      .set('Accept', 'application|json');

    expect(responseFour.status).toEqual(HttpCode.TOO_MANY_REQUESTS);
    expect(responseFour.body).toBeDefined();
  });
});
