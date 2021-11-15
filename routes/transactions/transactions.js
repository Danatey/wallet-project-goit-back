const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
} = require("../../controllers/transactions");

const quard = require("../../helpers/guard");

router.get("/", quard, getTransactions);
router.post("/create", quard, createTransaction);

module.exports = router;
