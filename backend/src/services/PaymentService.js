const crypto = require('crypto');
const moment = require('moment');
const querystring = require('querystring');

class VNPayService {
  constructor(config) {
    this.config = config;
  }

  generatePaymentUrl(paymentData) {
    try {
      const date = new Date();
      const createDate = moment(date).format('YYYYMMDDHHmmss');
      
      // Chuẩn bị params - chỉ chứa giá trị primitive
      const vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: this.config.vnp_TmnCode,
        vnp_Amount: paymentData.amount * 100,
        vnp_CreateDate: createDate,
        vnp_CurrCode: 'VND',
        vnp_IpAddr: paymentData.ipAddr,
        vnp_Locale: 'vn',
        vnp_OrderInfo: paymentData.orderInfo,
        vnp_OrderType: paymentData.orderType,
        vnp_ReturnUrl: this.config.vnp_ReturnUrl,
        vnp_TxnRef: paymentData.orderId,
        vnp_ExpireDate: moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss')
      };

      // Thêm bankCode nếu có
      if (paymentData.bankCode && paymentData.bankCode.trim() !== '') {
        vnp_Params['vnp_BankCode'] = paymentData.bankCode;
      }

      // Sắp xếp params theo thứ tự alphabet
      const sortedParams = this.sortObject(vnp_Params);

      // Tạo chuỗi query để ký
      const signData = new URLSearchParams(sortedParams).toString();
      
      // Tạo chữ ký
      const hmac = crypto.createHmac('sha512', this.config.vnp_HashSecret);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

      // Thêm chữ ký vào params
      sortedParams['vnp_SecureHash'] = signed;

      // Tạo URL thanh toán với URLSearchParams
      const queryString = new URLSearchParams(sortedParams).toString();
      const paymentUrl = `${this.config.vnp_Url}?${queryString}`;
      
      console.log('Generated valid VNPay URL:', paymentUrl);
      return paymentUrl;
    } catch (error) {
      console.error('Error generating payment URL:', error);
      throw new Error('Failed to generate payment URL');
    }
  }

  sortObject(obj) {
    return Object.keys(obj).sort().reduce((result, key) => {
      if (obj[key] !== undefined && obj[key] !== null) {
        result[key] = obj[key].toString();
      }
      return result;
    }, {});
  }
}

module.exports = VNPayService;