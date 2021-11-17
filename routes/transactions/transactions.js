const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransactionsByDate,
  getTransactionsByCategory,
} = require("../../controllers/transactions");

const quard = require("../../helpers/guard");

router.get("/", quard, getTransactions);
router.post("/create", quard, createTransaction);
router.get("/date", quard, getTransactionsByDate);
router.get("/categories", quard, getTransactionsByCategory);

module.exports = router;
