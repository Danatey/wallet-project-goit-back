const Joi = require("joi");
const { HttpCode } = require("../../config/constants");

const schemaTransaction = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  comment: [Joi.string(), Joi.number()],
  type: Joi.string().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Value of field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateTransaction = async (req, res, next) => {
  return await validate(schemaTransaction, req.body, res, next);
};
