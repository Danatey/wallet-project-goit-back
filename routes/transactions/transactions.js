const express = require("express");
const router = express.Router();

const { createTransaction } = require("../../controllers/transactions");

router.post("/create", createTransaction);
router.get("/", (_req, res) => {
  console.log("request to db");
  res.json({});
});

module.exports = router;
