const express = require("express");
const CartController = require('../controllers/CartController')
const router = express.Router();
const { authUserMiddleWare } = require('../middleware/authMiddleware');

router.get('/', authUserMiddleWare, CartController.getCart);
router.post('/add', authUserMiddleWare, CartController.addItem);
router.put('/update', authUserMiddleWare, CartController.updateItem);
router.delete('/remove', authUserMiddleWare, CartController.removeItem);
router.delete('/clear', authUserMiddleWare, CartController.clear);

module.exports = router
