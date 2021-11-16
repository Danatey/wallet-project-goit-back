const passport = require('passport');
require('../config/passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const Users = require('../repository/users');

jest.mock('../repository/users');

describe('Unit test passport', () => {
  const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };

  beforeEach(() => {
    // const payload = { id: 1 };
    Users.findById = jest.fn();
  });

  test('User exist', async () => {
    const payload = { id: 1 };
    passport.use = jest.fn(
      new Strategy(params, async (payload, cb) => {
        const user = await Users.findById(() => {
          return 'example@email.com';
        });
        return cb(null, user);
      })
    );
    const result = await passport.use;
    console.log('result: ', result);
    expect(result).toBeDefined();
    // expect(next).toHaveBeenCalled();
  });

  //   test('User exist but have wrong token', async () => {
  //     passport.authenticate = jest.fn(
  //       (strategy, options, cb) => (req, res, next) =>
  //         cb(null, { token: '123456' })
  //     );
  //     await guard(req, res, next);
  //     expect(req.get).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
  //     expect(res.json).toHaveBeenCalled();
  //   });

  //   test('User not exist', async () => {
  //     passport.authenticate = jest.fn(
  //       (strategy, options, cb) => (req, res, next) => cb(null, false)
  //     );
  //     await guard(req, res, next);
  //     expect(req.get).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
  //     expect(res.json).toHaveBeenCalled();
  //   });
});
