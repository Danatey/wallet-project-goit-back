const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {
  HttpCode,
  ValidUserName,
  ValidPassword,
} = require('../../config/constants');

const schemaUserSignup = Joi.object({
  name: Joi.string()
    .min(ValidUserName.MIN_NAME_LENGTH)
    .max(ValidUserName.MAX_NAME_LENGTH)
    .optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(ValidPassword.MIN_PASSWORD_LENGTH).required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(ValidPassword.MIN_PASSWORD_LENGTH).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: `Validation error: ${error.message}`,
    });
  }
};

module.exports.validateUserSignup = async (req, res, next) => {
  return await validate(schemaUserSignup, req.body, res, next);
};

module.exports.validateUserLogin = async (req, res, next) => {
  return await validate(schemaUserLogin, req.body, res, next);
};
