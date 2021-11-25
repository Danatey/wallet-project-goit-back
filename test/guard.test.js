const guard = require('../helpers/guard');
const passport = require('passport');
const { HttpCode } = require('../config/constants');
const jwt = require('jsonwebtoken');

const Tokens = require('../repository/tokens');

describe('Unit test guard helper', () => {
  const user = { accessToken: '111222333' };
  let req, res, next;

  beforeEach(() => {
    req = { get: jest.fn((header) => `Bearer ${user.accessToken}`), user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
    jwt.verify = jest.fn();
    Tokens.findBlackToken = jest.fn();
  });

  test('User exist', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, user)
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('User exist but have wrong token', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(null, { accessToken: '123456' })
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });

  test('User not exist', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, false)
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });

  test('User exist but have no valid token', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(new Error({ name: 'TokenExpiredError' }), {
          accessToken: '111222333',
        })
    );
    await guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  test('User"s token exist in black list', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(null, {
          accessToken: '111222333',
        })
    );
    const result = (Tokens.findBlackToken = jest.fn((token) => {
      token;
    }));

    if (result) {
      res.status(HttpCode.TOKEN_IS_ALREADY_USED).json({
        status: 'error',
        code: HttpCode.TOKEN_IS_ALREADY_USED,
        message: 'This token is already used',
      });
    }
    await guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.TOKEN_IS_ALREADY_USED);
  });
});
