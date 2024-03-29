const express = require("express");
const router = express.Router();
const { validateTransaction } = require("./validation");

const {
  createTransaction,
  getTransactions,
  getTransactionsByCategory,
  getCategoriesList,
} = require("../../controllers/transactions");

const quard = require("../../helpers/guard");

router.get("/", quard, getTransactions);
router.post("/create", quard, validateTransaction, createTransaction);
router.get("/categories", quard, getTransactionsByCategory);
router.get("/list", getCategoriesList);

module.exports = router;
