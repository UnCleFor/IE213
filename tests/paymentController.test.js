const { createPaymentUrl, vnpayReturn, vnpayIPN } = require('../backend/src/controllers/PaymentController');
const PaymentController = require('../backend/src/services/PaymentService');

jest.mock('../backend/src/services/PaymentService');

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

  describe('createPaymentUrl', () => {
    it('should return 400 if amount is missing or invalid', async () => {
      req.body = { orderId: '123' };
      await createPaymentUrl(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        code: '01'
      }));
    });

    it('should return 400 if orderId is invalid', async () => {
      req.body = { amount: 100000, orderId: 123 }; // not a string
      await createPaymentUrl(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    // it('should return URL when valid data', async () => {
    //     const paymentUrl = 'https://payment-url.com';
    
    //     // Tạo instance giống như controller
    //     const mockGenerate = jest.fn().mockResolvedValue(paymentUrl);
    //     const instance = new PaymentController();
    //     instance.generatePaymentUrl = mockGenerate;
    
    //     // Gọi test
    //     req.body = { amount: 100000, orderId: 'ORD123' };
    //     await createPaymentUrl(req, res);
    
    //     expect(res.json).toHaveBeenCalledWith({
    //       code: '00',
    //       message: 'success',
    //       data: paymentUrl
    //     });
    //   });

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

  describe('vnpayReturn', () => {
    it('should redirect to order-success if payment success', async () => {
      req.query = { vnp_ResponseCode: '00' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);

      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/order-success');
    });

    it('should redirect to cancel if code 24', async () => {
      req.query = { vnp_ResponseCode: '24' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);

      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_cancel');
    });

    it('should redirect to fail if other codes', async () => {
      req.query = { vnp_ResponseCode: '97' };
      PaymentController.prototype.verifyReturn.mockReturnValue(true);

      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_fail');
    });

    it('should redirect to fail if verifyReturn fails', async () => {
      PaymentController.prototype.verifyReturn.mockReturnValue(false);
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_fail');
    });

    it('should redirect to error on exception', async () => {
      PaymentController.prototype.verifyReturn.mockImplementation(() => { throw new Error('some error') });
      await vnpayReturn(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/cart?payment_status=vnpay_error');
    });
  });

  describe('vnpayIPN', () => {
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

    it('should return error if checksum invalid', async () => {
      PaymentController.prototype.verifyReturn.mockReturnValue(false);
      await vnpayIPN(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        RspCode: '97',
        Message: 'Invalid checksum'
      });
    });

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
