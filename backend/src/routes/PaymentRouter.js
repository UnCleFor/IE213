const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

// tạo URL thanh toán VNPay
router.post('/vnpay/create_payment_url', PaymentController.createPaymentUrl);

// redirect người dùng về trang này sau khi thanh toán xong
router.get('/vnpay/vnpay_return', PaymentController.vnpayReturn);

// endpoint để VNPay gọi lại khi trạng thái thanh toán thay đổi
router.get('/vnpay/vnpay_ipn', PaymentController.vnpayIPN);

module.exports = router;