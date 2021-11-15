const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout } = require("../../controllers/users");

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
