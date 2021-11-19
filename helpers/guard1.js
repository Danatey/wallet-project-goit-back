const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('../config/constants');

const guard1 = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard1;
