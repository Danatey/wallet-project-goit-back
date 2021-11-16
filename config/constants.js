const ValidUserName = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 12,
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
  INTERNAL_SERVER_ERROR: 500,
};

const TransactionsCategory = [
  "основной",
  "еда",
  "авто",
  "развитие",
  "дети",
  "дом",
  "образовние",
  "остальные",
];

module.exports = {
  ValidUserName,
  HttpCode,
  TransactionsCategory,
};
