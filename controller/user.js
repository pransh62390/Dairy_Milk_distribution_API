const path = require("path");
const {signup, login, logout} = require("../models/user");

const signupPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../view/signup.html"));
};

const loginPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../view/login.html"));
};

module.exports = {signupPage, signup, loginPage, login, logout};
