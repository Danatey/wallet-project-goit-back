

const { HttpCode } = require('../config/constants');

const Tokens = require("../repository/tokens");

const checkToken = async (req, res, next) => {
  const { accessToken } = req.body;
  console.log(accessToken)
  const blackListToken = Tokens.findBlackToken(accessToken);
    console.log(blackListToken.accessToken)
    if (blackListToken.accessToken === accessToken) {
      return res.status(HttpCode.UNABLE_TO_PARSE_TOKEN).json({
        status: 'error',
        code: HttpCode.UNABLE_TO_PARSE_TOKEN,
        message: 'This token is already used',
      });
    }

};

module.exports = checkToken;
