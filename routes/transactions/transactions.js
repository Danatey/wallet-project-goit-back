const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransactionsByMonth,
  getTransactionsByYear,
} = require("../../controllers/transactions");

const quard = require("../../helpers/guard");

router.get("/", quard, getTransactions);
router.post("/create", quard, createTransaction);
router.get("/month", quard, getTransactionsByMonth);
router.get("/year", quard, getTransactionsByYear);

module.exports = router;
