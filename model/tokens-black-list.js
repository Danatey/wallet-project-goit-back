const { Schema, model } = require("mongoose");

const tokenBlackListSchema = new Schema(
  {
    token: {
      type: String,
      default: null,
    },
  }
);

const tokenBlackList = model("token", tokenBlackListSchema);

module.exports = {
  tokenBlackList,
};