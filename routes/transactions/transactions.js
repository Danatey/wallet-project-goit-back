const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
} = require("../../controllers/transactions");

router.get("/", getTransactions);
router.post("/create", createTransaction);

module.exports = router;
