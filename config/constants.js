const ValidUserName = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 12,
};

const ValidPassword = {
  MIN_PASSWORD_LENGTH: 8,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTORIZED: 401,
  FORBIDDEN: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const RateLimitVariables = {
  rateTime: 15 * 60 * 1000,
  rateLimit: 3,
};

const TransactionsCategoryExpance = [
  "основной",
  "еда",
  "авто",
  "развитие",
  "дети",
  "дом",
  "образовние",
  "остальные",
];
const TransactionsCategoryIncome = ["регулярний доход", "нерегулярний доход"];

module.exports = {
  ValidUserName,
  HttpCode,
  RateLimitVariables,
  ValidPassword,
  TransactionsCategoryExpance,
  TransactionsCategoryIncome,
};
