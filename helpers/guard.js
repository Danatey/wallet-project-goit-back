const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('../config/constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    if (!user || error || accessToken !== user.accessToken) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    console.log(error)
    if (error.code = 500) {
      return res.status(HttpCode.NO_CONTENT).json({
            status: 'error',
            code: HttpCode.NO_CONTENT,
            message: 'Reloade token',
          });
    }
    // else {
    //   return res.status(HttpCode.NO_CONTENT).json({
    //     status: 'error',
    //     code: HttpCode.NO_CONTENT,
    //     message: 'Reloade token',
    //   });
    // };
    
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
