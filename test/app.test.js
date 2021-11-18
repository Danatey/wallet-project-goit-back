const request = require('supertest');

require('dotenv').config();

const app = require('../app');
const db = require('../config/db');
const { HttpCode } = require('../config/constants');

const User = require('../model/user');

const { newUserForRouteUser } = require('./data/data');

describe('Unit test for user"s router', () => {
  let token;
  beforeAll(async () => {
    await db;
    // await User.deleteOne({ email: newUserForRouteUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    // await User.deleteOne({ email: newUserForRouteUser.email });
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

  test('Login user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteUser)
      .set('Accept', 'application|json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
    token = response.body.data.token;
  });

  // test('Logout user', async () => {
  //   const response = await request(app)
  //     .post('/api/users/logout')
  //     .set('Accept', 'application|json');

  //   expect(response.status).toEqual(HttpCode.NO_CONTENT);
  //   expect(response.body).toBeDefined();
  // });
});
