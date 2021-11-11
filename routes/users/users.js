const express = require("express");
const router = express.Router();

const { login } = require("../../controllers/users");

router.get("/", login);

module.exports = router;
