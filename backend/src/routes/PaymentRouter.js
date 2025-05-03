const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/vnpay/create_payment_url', PaymentController.createPaymentUrl);
router.get('/vnpay/vnpay_return', PaymentController.vnpayReturn);
router.get('/vnpay/vnpay_ipn', PaymentController.vnpayIPN);

module.exports = router;