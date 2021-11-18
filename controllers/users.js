const Users = require('../repository/users');
const { HttpCode } = require('../config/constants');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');
require('dotenv').config();
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
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = uuid({ expiresIn: '1h' });
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
  await Users.updateToken(id, null, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const { email, accessToken, refreshToken, _id, balance, category } = req.user;
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
      },
    });
  } catch (error) {
    next(error);
  }
};

// const refreshTokens = async (req, res, next) => {
//   try {
//     const { email, accessToken, refreshToken, _id, balance, category } = req.user;
//     return res.status(HttpCode.OK).json({
//       status: 'success',
//       code: HttpCode.OK,
//       data: {
//         email,
//         access_token: accessToken,
//         refresh_token: refreshToken,
//         id: _id,
//         balance,
//         category,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const refresh = async (req, res, next) => {
//   try {
//     const { email, accessToken, refreshToken, _id, balance, category } = req.user;
//     const { oldRefreshToken } = req.body;
//     console.log(req.user)
//     const { _id } = req.user;
//     const { email, password } = req.body;
//     const user = await Users.findByEmail(email);
//     const isValidPassword = await user?.isValidPassword(password);
//     if (refreshToken !== ) {
//       return res.status(HttpCode.UNAUTORIZED).json({
//         status: 'error',
//         code: HttpCode.UNAUTORIZED,
//         message: 'Invalid credentials',
//       });
//     }
//     const id = _id;
//     const payload = { id };
//     const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
//     const refreshToken = uuid({ expiresIn: '1h' });
//     await Users.updateToken(id, accessToken, refreshToken);
//     return res.status(HttpCode.OK).json({
//       status: 'success',
//       code: HttpCode.OK,
//       data: {
//         access_token: accessToken,
//         refresh_token: refreshToken,
//       },
//     });
//   } catch(error) {
//     next(error);
//   };
  
// };

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  // refreshTokens,
};
