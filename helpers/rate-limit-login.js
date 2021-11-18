const rateLimit = require('express-rate-limit');
const { HttpCode, RateLimitVariables } = require('../config/constants');

const limiter = rateLimit({
  windowMs: RateLimitVariables.rateTime,
  max: RateLimitVariables.rateLimit,
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too many requests',
    });
  },
});

module.exports = limiter;
