const Category = require("../repository/categories");
const { HttpCode } = require("../config/contants");

const getCategories = async (req, res) => {
  try {
    const data = await Category.listCategories();
    res.json({ status: "success", code: HttpCode.OK, data: data });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getCategories,
};
