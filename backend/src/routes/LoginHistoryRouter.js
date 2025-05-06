const express = require("express");
const router = express.Router()
const LoginHistoryController = require('../controllers/LoginHistoryController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.get('/get-login-history/:id', authMiddleWare, LoginHistoryController.getLoginHistory)


module.exports = router