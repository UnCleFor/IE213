const express = require("express");
const router  = express.Router()
const OrderController = require("../controllers/OrderController")
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware")

router.post("/create", authUserMiddleWare, OrderController.createOrder)
router.get('/get_order/:id', authUserMiddleWare, OrderController.getOrderDetails)
router.get('/get-all-order',authMiddleWare,OrderController.getAllOrders)
router.put("/update/:id", authUserMiddleWare, OrderController.updatedOrder)
module.exports = router