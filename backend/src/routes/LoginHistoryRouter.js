const express = require("express");
const router = express.Router()
const LoginHistoryController = require('../controllers/LoginHistoryController')
const { authMiddleWare } = require("../middleware/authMiddleware")

// lấy lịch sử đăng nhập của user theo ID
router.get('/get-login-history/:id', authMiddleWare, LoginHistoryController.getLoginHistory)

module.exports = router