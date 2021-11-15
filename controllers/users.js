const Users = require('../repository/users');
const { HttpCode } = require ('../config/contants');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res
      .status(HttpCode.CONFLICT)
      .json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already exist',
    });
  }
  try {
    // TOD: Send email for verify user

    const newUser = await Users.create({ name, email, password });
    // const emailService = new EmailService(
    //   process.env.NODE_ENV,
    // )
    return res
      .status(HttpCode.CREATED)
      .json({
      status: 'success',
      code: HttpCode.CREATED,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          // successEmail: statusEmail,
        },
      });
    } catch(error) {
        next(error)
    }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);
  if (!user || !isValidPassword) {
    return res
      .status(HttpCode.UNAUTORIZED)
      .json({
      status: 'error',
      code: HttpCode.UNAUTORIZED,
      message: 'Invalid credentials',
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await Users.updateToken(id, token);
    return res
            .status(HttpCode.OK)
            .json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
            },
    });
};

const logout = async (req, res, next) => {
  res.json();
};

module.exports = {
  signup,
  login,
  logout,
};
