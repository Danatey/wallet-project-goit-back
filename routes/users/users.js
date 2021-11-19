const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  validateUserLogin,
} = require('./validation');
const {
  signup,
  login,
  logout,
  currentUser,
  refreshTokens,
  } = require("../../controllers/users");
const guard = require('../../helpers/guard');
const guard1 = require('../../helpers/guard1');
const loginLimit = require('../../helpers/rate-limit-login');

router.post('/signup', validateUserSignup, signup);
router.post('/login', loginLimit, validateUserLogin, login);
router.post('/logout', guard, logout);
router.get('/info', guard,currentUser);
router.post('/refresh-tokens', guard1, refreshTokens);

module.exports = router;
