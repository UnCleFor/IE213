const express = require("express");
const router  = express.Router()
const OrderController = require("../controllers/OrderController")
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware")

// tạo đơn hàng mới
router.post("/create", authUserMiddleWare, OrderController.createOrder)

// lấy chi tiết đơn hàng theo ID
router.get('/get_order/:id', authUserMiddleWare, OrderController.getOrderDetails)

// lấy toàn bộ đơn hàng
router.get('/get-all-order',authMiddleWare,OrderController.getAllOrders)

// cập nhật đơn hàng theo ID
router.put("/update/:id", authUserMiddleWare, OrderController.updatedOrder)

// lấy chi tiết đơn hàng theo ID
router.get('/get_order/:id', authMiddleWare, OrderController.getOrderDetails)

// lấy tất cả đơn hàng của user
router.get('/get_order_byuser/:userId', authUserMiddleWare, OrderController.getOrderByUser)

// xóa một đơn hàng theo ID
router.delete("/delete/:id", authUserMiddleWare, OrderController.deleteOrder)

// xóa nhiều đơn hàng
router.post("/delete-many",authMiddleWare, OrderController.deleteManyOrder)

module.exports = router