const { tokenBlackList } = require("../model/tokens-black-list");

const addTokenInBlackList = async (token) => {
  return await tokenBlackList.create({ token });
};

const findBlackToken = async (token) => {
  return await tokenBlackList.findOne({ token });
};

module.exports = {
  addTokenInBlackList,
  findBlackToken
};