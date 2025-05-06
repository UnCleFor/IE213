const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare, trackActivity } = require("../middleware/authMiddleware")

router.post('/sign-up', userController.createUser)
router.post('/sign-in',trackActivity, userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', authMiddleWare, userController.getAllUser)
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post("/delete-many", authMiddleWare, userController.deleteManyUser)
router.get('/get-email/:id', authMiddleWare, userController.getUserEmail)
router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password', userController.resetPassword)

router.put('/log-out-status/:id', authUserMiddleWare,userController.updateLogoutStatus)
router.put('/block/:id',authMiddleWare, userController.blockUser);
module.exports = router
