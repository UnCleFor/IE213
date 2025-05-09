const { createPaymentUrl, vnpayReturn, vnpayIPN } = require('../backend/src/controllers/PaymentController');
const PaymentController = require('../backend/src/services/PaymentService');

// Mock service thanh toán để kiểm thử
jest.mock('../backend/src/services/PaymentService');

// Mô tả test suite cho PaymentController
describe('PaymentController', () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: {},
      query: {},
      ip: '127.0.0.1',
      headers: {},
      connection: { remoteAddress: '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn()
    };
    PaymentController.prototype.generatePaymentUrl = jest.fn();
    PaymentController.prototype.verifyReturn = jest.fn();
  });

  // Test suite cho hàm tạo URL thanh toán
  describe('createPaymentUrl', () => {

        // Test case 1: Trả về lỗi 400 nếu thiếu amount hoặc không hợp lệ
    it('should return 400 if amount is missing or invalid', async () => {
      req.body = { orderId: '123' };
      await createPaymentUrl(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        code: '01'
      }));
    });

    // Test case 2: Trả về lỗi 400 nếu orderId không hợp lệ
    it('should return 400 if orderId is invalid', async () => {
      req.body = { amount: 100000, orderId: 123 };
      await createPaymentUrl(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

        // Test case 3: Trả về lỗi 500 khi có lỗi xảy ra
    it('should return 500 on error', async () => {
      req.body = { amount: 100000, orderId: 'ORD123' };
      PaymentController.prototype.generatePaymentUrl.mockRejectedValue(new Error('test-error'));
      await createPaymentUrl(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        code: "99", message: "URL thanh toán không hợp lệ"
      }));
    });
  });

    // Test suite cho hàm xử lý return từ VNPay
  describe('vnpayReturn', () => {

     // Test case 1: Redirect đến trang thành công khi thanh toán thành công (code 00)
    it('should redirect to order-success if payment success', async () => {
      req.query = { vnp_ResponseCode: '00' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/order-success');
    });

  // Test case 2: Redirect đến trang hủy khi code 24 (khách hủy thanh toán)
    it('should redirect to cancel if code 24', async () => {
      req.query = { vnp_ResponseCode: '24' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_cancel');
    });

// Test case 3: Redirect đến trang thất bại với các mã lỗi khác
    it('should redirect to fail if other codes', async () => {
      req.query = { vnp_ResponseCode: '97' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_fail');
    });

    // Test case 4: Redirect đến trang thất bại nếu verifyReturn thất bại
    it('should redirect to fail if verifyReturn fails', async () => {
      PaymentController.prototype.verifyReturn.mockReturnValue(false);
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_fail');
    });

    // Test case 5: Redirect đến trang lỗi khi có exception
    it('should redirect to error on exception', async () => {
      PaymentController.prototype.verifyReturn.mockImplementation(() => { throw new Error('some error') });
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_error');
    });
  });

  // Test suite cho hàm xử lý IPN (Instant Payment Notification) từ VNPay
  describe('vnpayIPN', () => {

        // Test case 1: Trả về thành công nếu hợp lệ
    it('should return success if valid', async () => {
      req.query = { vnp_TxnRef: 'ORD123', vnp_ResponseCode: '00' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);
      await vnpayIPN(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        RspCode: '00',
        Message: 'Confirm Success'
      });
    });

    // Test case 2: Trả về lỗi nếu checksum không hợp lệ
    it('should return error if checksum invalid', async () => {
      PaymentController.prototype.verifyReturn.mockReturnValue(false);
      await vnpayIPN(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        RspCode: '97',
        Message: 'Invalid checksum'
      });
    });
    
    // Test case 3: Trả về lỗi khi có exception
    it('should return error if exception', async () => {
      PaymentController.prototype.verifyReturn.mockImplementation(() => { throw new Error('Unexpected') });
      await vnpayIPN(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        RspCode: '99',
        Message: 'Unexpected'
      });
    });
  });
});
