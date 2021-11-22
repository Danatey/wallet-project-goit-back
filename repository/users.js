const { User } = require("../model/user");
const { tokenBlackList } = require("../model/tokens-black-list");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, accessToken, refreshToken) => {
  return await User.updateOne({ _id: id }, { accessToken, refreshToken });
};

const findById = async (id) => {
  return await User.findById(id);
};

const findByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshToken });
};

const addBalance = async (id, balance) => {
  return await User.updateOne({ _id: id }, { balance });
};

const addTokenInBlackList = async (token) => {
  return await tokenBlackList.insertMany({ token });
};

const findBlackToken = async (token) => {
  return await tokenBlackList.findOne({ token });
};

module.exports = {
  findByEmail,
  create,
  updateToken,
  findById,
  findByRefreshToken,
  addBalance,
  addTokenInBlackList,
  findBlackToken
};