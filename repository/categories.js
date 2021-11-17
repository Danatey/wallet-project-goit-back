const Category = require("../model/category");

const listCategories = async () => {
  const results = await Category.find({});
  return results;
};

module.exports = {
  listCategories,
};
