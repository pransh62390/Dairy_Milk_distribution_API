const express = require("express");
const router = express.Router();

const {neworder, updateOrder, updateStatus, deleteOrder, checkCapacity} = require("../controller/orders");

router.route('/add').post(neworder);
router.route('/update/:id').put(updateOrder);
router.route('/updateStatus/:id').put(updateStatus);
router.route('/delete/:id').delete(deleteOrder);
router.route('/checkCapacity/:date').get(checkCapacity);

module.exports = router;
