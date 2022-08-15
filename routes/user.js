const express = require("express");
const router = express.Router();

const {signupPage, signup, loginPage, login, logout} = require("../controller/user");

router.route('/signup').get(signupPage).post(signup);
router.route('/login').get(loginPage).post(login);
router.route('/logout').get(logout);

module.exports = router;
