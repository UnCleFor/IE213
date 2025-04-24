const express = require("express");
const router  = express.Router()
const OrderController = require("../controllers/OrderController")
const { authUserMiddleWare } = require("../middleware/authMiddleware")

router.post("/create", authUserMiddleWare, OrderController.createOrder)
router.get('/get_order/:id', authUserMiddleWare, OrderController.getOrderDetails)

module.exports = router