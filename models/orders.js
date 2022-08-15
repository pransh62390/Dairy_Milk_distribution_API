const {config, mysql, query} = require("../db/connect");

const neworder = async (req, res)=> {
    let ts = Date.now();
    let sql = `insert into orders (orderid, userid, quantity, status, date) values ('', '${req.body.uid}', '${req.body.quantity}', 'placed', '${ts}')`;
    const rows = await query(sql);
    // console.log(rows);
    if(rows.affectedRows > 0)
        res.json({success: true});
    else 
        res.json({success: false});
    return;
};

const updateOrder = async (req, res) => {
    let sql = `update orders set quantity=${req.body.quantity} where orderid = ${req.params.id};`;
    const rows = await query(sql);
    // console.log(rows);
    if(rows.affectedRows > 0)
        res.json({success: true});
    else 
        res.json({success: false});
    return;
}

const updateStatus = async (req, res) => {
    let sql = `update orders set status='${req.body.status}' where orderid = ${req.params.id};`;
    const rows = await query(sql);
    // console.log(rows);
    if(rows.affectedRows > 0)
        res.json({success: true});
    else 
        res.json({success: false});
    return;
}

const deleteOrder = async (req, res) => {
    let sql = `delete from orders where orderid = ${req.params.id};`;
    const rows = await query(sql);
    // console.log(rows);
    if(rows.affectedRows > 0)
        res.json({success: true});
    else 
        res.json({success: false});
    return;
}

const checkCapacity = async (req, res) => {
    const totalCapacity = 100;
    var dateString = req.params.date;
    var dateParts = dateString.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    let sql = `select SUM(quantity) as capacity from orders where date = ${dateObject.now()};`;
    const rows = await query(sql);
    var obj = rows[0];
    obj.avaliable = totalCapacity-obj.capacity;
    if(rows.length > 0)
        res.json(obj);
    else 
        res.json({success: false});
    return;
}

module.exports = {neworder, updateOrder, updateStatus, deleteOrder, checkCapacity};
