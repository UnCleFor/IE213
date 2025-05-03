const PaymentController = require('../services/PaymentService');
const dotenv = require("dotenv")

dotenv.config()

const vnpayConfig = {
  vnp_TmnCode: 'KITVNV3K',
  vnp_HashSecret: '4FM9L8HWF5UXFVB3NSGT6NWBUBE3ZIL3',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl: 'http://localhost:3000/checkout',
  vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction'
};

const vnpayService = new PaymentController(vnpayConfig);

const createPaymentUrl = async (req, res) => {
  try {
    const { amount, orderId, bankCode, orderInfo, orderType } = req.body;
    
    // Validate chặt chẽ
    if (!amount || isNaN(amount) ) {
      return res.status(400).json({ 
        code: '01', 
        message: 'Số tiền phải là số và lớn hơn 0' 
      });
    }
    
    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({ 
        code: '01', 
        message: 'orderId phải là chuỗi và không được trống' 
      });
    }

    const ipAddr = req.ip || 
                  req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress;

    const paymentData = {
      amount: parseInt(amount),
      bankCode: bankCode || '',
      orderInfo: orderInfo || `Thanh toán đơn hàng ${orderId}`,
      orderType: orderType || 'other',
      orderId: orderId,
      ipAddr: ipAddr
    };

    console.log('Payment data being processed:', paymentData);
    
    const paymentUrl = await vnpayService.generatePaymentUrl(paymentData);
    
    if (!paymentUrl || typeof paymentUrl !== 'string') {
      throw new Error('URL thanh toán không hợp lệ');
    }

    return res.json({ 
      code: '00', 
      message: 'success', 
      data: paymentUrl 
    });
  } catch (error) {
    console.error('Payment URL creation failed:', error);
    return res.status(500).json({ 
      code: '99', 
      message: error.message || 'Lỗi hệ thống khi tạo URL thanh toán' 
    });
  }
};

const vnpayReturn = async (req, res) => {
  try {
    const vnp_Params = req.query;
    const isValid = vnpayService.verifyReturn(vnp_Params);

    if (!isValid) {
      return res.redirect('/cart?payment_status=vnpay_fail');
    }

    if (vnp_Params['vnp_ResponseCode'] === '00') {
      // Thanh toán thành công
      return res.redirect('/order-success');
    } 
    else if (vnp_Params['vnp_ResponseCode'] === '24') {
      // Hủy thanh toán
      return res.redirect('/cart?payment_status=vnpay_cancel');
    }
    else {
      // Lỗi thanh toán khác
      return res.redirect('/cart?payment_status=vnpay_fail');
    }
  } catch (error) {
    return res.redirect('/cart?payment_status=vnpay_error');
  }
};

const vnpayIPN = async (req, res) => {
  // Xử lý IPN (Instant Payment Notification) từ VNPay
  // Được gọi khi có thay đổi trạng thái thanh toán
  try {
    const vnp_Params = req.query;
    const isValid = vnpayService.verifyReturn(vnp_Params);

    if (!isValid) {
      return res.status(200).json({
        RspCode: '97',
        Message: 'Invalid checksum'
      });
    }

    const orderId = vnp_Params['vnp_TxnRef'];
    const rspCode = vnp_Params['vnp_ResponseCode'];

    // Xử lý đơn hàng theo orderId và rspCode
    // Cập nhật database, gửi email xác nhận, v.v.

    return res.status(200).json({
      RspCode: '00',
      Message: 'Confirm Success'
    });
  } catch (error) {
    return res.status(200).json({
      RspCode: '99',
      Message: error.message
    });
  }
};

module.exports = {
  vnpayIPN,
  vnpayReturn,
  createPaymentUrl
}