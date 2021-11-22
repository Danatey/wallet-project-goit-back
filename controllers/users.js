const Users = require("../repository/users");
const Tokens = require("../repository/tokens");
const { HttpCode, tokenExpires } = require("../config/constants");
const jwt = require("jsonwebtoken");
const { uuid } = require("uuidv4");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already exist',
    });
  }
  try {
    const newUser = await Users.create({ name, email, password });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTORIZED,
      message: 'Invalid credentials',
    });
  }
  const id = user._id;
  const payload = { id };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: tokenExpires.ACCESS_TOKEN_EXPIRES });
  const refreshToken = uuid();
  await Users.updateToken(id, accessToken, refreshToken);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  const refreshToken = req.user.refreshToken;
  const accessToken = req.user.accessToken;
  Tokens.addTokenInBlackList(refreshToken);
  Tokens.addTokenInBlackList(accessToken);
  await Users.updateToken(id, null, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const { email, accessToken, refreshToken, _id, balance, category, name } =
      req.user;
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email,
        accessToken,
        refreshToken,
        id: _id,
        balance,
        category,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  const { refreshToken } = req.body;
  const blackListToken = await Tokens.findBlackToken( refreshToken );
  console.log(blackListToken)
    if (blackListToken) {
      return res.status(HttpCode.TOKEN_IS_ALREADY_USED).json({
        status: 'error',
        code: HttpCode.TOKEN_IS_ALREADY_USED,
        message: 'This token is already used',
      });
    }
  const user = await Users.findByRefreshToken(refreshToken);
  if (!user || refreshToken !== user.refreshToken) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTORIZED,
      message: 'Error, please login',
    });
  }
  
  try {
    const id = user._id;
    const payload = { id };
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = uuid();
    await Users.updateToken(id, accessToken, refreshToken);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  refreshTokens,
};
