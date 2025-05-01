import React from 'react';
import { Button, message } from 'antd';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from '../../services/OrderService';

const VNPayButton = ({ 
  amount,
  orderInfo = `Thanh toán đơn hàng ${Date.now()}`,
  orderType = 'other',
  orderData,
  onSuccess,
  onError
}) => {
  const paymentUrlMutation = useMutationHooks(
    (data) => OrderService.createPaymentUrl(data)
  );

  const handlePayment = async () => {
    // Validate input
    if (!amount || amount <= 0) {
      message.error('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    if (!orderData?.orderItems?.length) {
      message.error('Giỏ hàng không có sản phẩm nào');
      return;
    }

    try {
      // Tạo payment data
      const paymentData = {
        amount: Math.round(Number(amount)),
        orderInfo: orderInfo.slice(0, 255), // Giới hạn độ dài theo yêu cầu VNPay
        orderType,
        orderId: Date.now().toString(),
        returnUrl: `${window.location.origin}/checkout?payment_method=vnpay`,
        clientIp: '127.0.0.1', // IP của khách hàng
        locale: 'vn', // Ngôn ngữ
        currency: 'VND'
      };

      // Gọi API tạo URL thanh toán
      const response = await paymentUrlMutation.mutateAsync(paymentData);
      
      // Xử lý response
      const paymentUrl = extractPaymentUrl(response);
      
      if (!paymentUrl) {
        throw new Error('Không nhận được URL thanh toán từ hệ thống');
      }

      // Chuyển hướng đến VNPay
      window.location.href = paymentUrl;
      
    } catch (error) {
      console.error('Payment error:', {
        error: error.response?.data || error.message,
        config: error.config
      });
      
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Tạo URL thanh toán thất bại';
      
      message.error(errorMsg);
      onError?.(error);
    }
  };

  // Hàm trích xuất URL thanh toán từ nhiều định dạng response khác nhau
  const extractPaymentUrl = (response) => {
    if (!response || !response.data) return null;

    // Trường hợp 1: Response là URL string trực tiếp
    if (typeof response.data === 'string' && response.data.startsWith('http')) {
      return response.data;
    }

    // Trường hợp 2: Response có cấu trúc { data: { paymentUrl: string } }
    if (response.data?.paymentUrl) {
      return response.data.paymentUrl;
    }

    // Trường hợp 3: Response có cấu trúc { code, message, data }
    if (response.data?.code === '00' && typeof response.data?.data === 'string') {
      return response.data.data;
    }

    // Trường hợp 4: Các cấu trúc khác
    return response.data?.url || response.data;
  };

  return (
    <Button 
      type="primary"
      onClick={handlePayment}
      loading={paymentUrlMutation.isLoading}
      disabled={!amount || amount <= 0 || !orderData?.orderItems?.length}
      style={{
        backgroundColor: 'brown',
        borderColor: 'brown',
        padding: '12px 28px',
        borderRadius: '8px',
        height: 'auto',
        marginBottom: '10px',
      }}
    >
      {paymentUrlMutation.isLoading ? 'Đang tạo liên kết...' : 'Thanh toán qua VNPay'}
    </Button>
  );
};

export default VNPayButton;