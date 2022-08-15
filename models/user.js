const {config, mysql, query} = require("../db/connect");

const signup = async (req, res)=> {
    let sql = `insert into users (email, password, phone, user_id) values ('${req.body.email}', '${req.body.password}', '${req.body.mobile}', '')`;
    const rows = await query(sql);
    console.log(rows);
    res.send("Data inserted successfully");
    return;
};

const login = async (req, res) => {
    let params = {email: req.body.email, password: req.body.password};
    let sql = `select password from users where email='${params.email}'`;
    const rows = await query(sql);
    if(rows.length == 0) {
        res.send("check your email id...");
        return;
    }
    if(params.password === rows[0].password) {
        session=req.session;
        session.userid=req.body.email;
        console.log(req.session)
        res.send(`Hey there, welcome <a href='http://localhost:8080/app/logout'>click to logout</a>`);
        // res.send("You are successfully loged in")
        return;
    } else {
        res.send("Invalid password...");
        return;
    }
};

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/app');
};

module.exports = {signup, login, logout};
