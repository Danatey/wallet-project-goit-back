const express = require("express");
const router = express.Router();

const {
  getCategoriesList,
  addCategory,
} = require("../../controllers/categories");

const quard = require("../../helpers/guard");

router.get("/list", quard, getCategoriesList);
router.post("/create", quard, addCategory);

module.exports = router;
