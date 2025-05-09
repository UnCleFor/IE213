const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare, trackActivity } = require("../middleware/authMiddleware")

// đăng ký tài khoản
router.post('/sign-up', userController.createUser)

// đăng nhập tài khoản và ghi lịch sử đăng nhập
router.post('/sign-in',trackActivity, userController.loginUser)

// đăng xuất
router.post('/log-out', userController.logoutUser)

// cập nhật thông tin user theo ID
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)

// xóa user theo ID
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)

// lấy toàn bộ ds user
router.get('/getAll', authMiddleWare, userController.getAllUser)

// lấy thông tin chi tiết user theo ID
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)

// tạo mới access token từ refresh token
router.post('/refresh-token', userController.refreshToken)

// xóa nhiều user theo ds ID
router.post("/delete-many", authMiddleWare, userController.deleteManyUser)

// lấy email user theo ID
router.get('/get-email/:id', authMiddleWare, userController.getUserEmail)

// gửi OTP để đặt lại mật khẩu
router.post('/forgot-password', userController.forgotPassword)

// đặt lại mật khẩu
router.post('/reset-password', userController.resetPassword)

// cập nhật trạng thái đăng xuất cho user
router.put('/log-out-status/:id', authUserMiddleWare,userController.updateLogoutStatus)

// chặn user theo ID
router.put('/block/:id',authMiddleWare, userController.blockUser);
module.exports = router
