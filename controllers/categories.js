const Category = require("../repository/categories");
const { HttpCode } = require("../config/constants");

const getCategories = async (req, res) => {
  try {
    const data = await Category.listCategories();
    return res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.OK, data: data });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getCategories,
};
