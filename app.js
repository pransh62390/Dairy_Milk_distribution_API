const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const user = require("./routes/user");
const orders = require("./routes/orders");

const {config, mysql} = require("./db/connect");

// middleware

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

app.use('/app', express.static(path.join(__dirname, "/view")));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/app', user);
app.use('/app', orders);

app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, './view/404.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server is running on port ${port}`));
