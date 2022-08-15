const path = require("path");
const {neworder, updateOrder, updateStatus, deleteOrder, checkCapacity} = require("../models/orders");

module.exports = {neworder, updateOrder, updateStatus, deleteOrder, checkCapacity};
