const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('../config/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    if (!user || error || accessToken !== user.accessToken) {
      jwt.verify(accessToken, SECRET_KEY, function (error, decoded) {
        if (error) {
          if (error.name === 'TokenExpiredError')
            return res.json({
              status: "error",
              code: HttpCode.ACCESS_TOKEN_EXPIRED,
              message: "Access Token was expired!",
            });
          else
            return res.json({
              status: "error",
              code: HttpCode.UNABLE_TO_PARSE_TOKEN,
              message: "Unable to parse token",
            });
        } 
        else {
          next();
        }
      });
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
