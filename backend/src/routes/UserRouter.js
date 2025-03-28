const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/sign_up',userController.createUser)
router.post('/sign_in',userController.loginUser)
module.exports = router
