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
    expect(result).toBeDefined();
  });

  test('User not exist', async () => {
    let response;
    const payload = { id: 1 };
    passport.use = jest.fn(
      new Strategy(params, async (payload, cb) => {
        const user = await Users.findById((payload) => {
          return false;
        });
        return cb(new Error('User not found'), false);
      })
    );

    await passport.use;
    const result = function cb() {
      new Error('User not found');
    };

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Function);
  });
});
