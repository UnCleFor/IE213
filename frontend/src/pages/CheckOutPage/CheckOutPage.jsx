import React, { 
  useState,
  useMemo,
  useEffect
} from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Radio,
  Input,
  Form,
  Divider,
  Avatar
} from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { OrderDetailWrapper } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService"
import * as UserService from "../../services/UserService"
import { useSelector } from "react-redux";
import { convertPrice, convertVNDToUSD } from "../../utils";
import Loading from '../../components/LoadingComponent/Loading'
import { useLocation, useNavigate } from "react-router-dom";
import * as message from '../../components/Message/Message';
import { orderConstant } from "../../constant";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import PayPalButtonComponent from "../../components/PaypalButtonComponent/PaypalButtonComponent";
import VNPayButton from "../../components/VNPayButton/VNPayButton";

const { Title, Text } = Typography;

// Dữ liệu các phương thức được lấy từ file constant
const shippingMethods = Object.keys(orderConstant.delivery).map((key) => ({
  id: key,
  name: orderConstant.delivery[key].label,
  fee: orderConstant.delivery[key].fee,
}));
const paymentMethods = Object.keys(orderConstant.payment).map((key) => ({
  id: key,
  name: orderConstant.payment[key],
}));

const CheckoutPage = () => {
  const [form] = Form.useForm(); // Tạo form instance
  const [delivery, setDelivery] = useState('standard') // Thiết lập mặc định là giao hàng tiêu chuẩn
  const [payment, setPayment] = useState('cod') // Thiết lập mặc định là thanh toán khi nhận hàng
  const navigate = useNavigate()
  const order = useSelector((state) => state.order); // Lấy thông tin đơn hàng từ trang giỏ hàng
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng
  const [pendingOrderData, setPendingOrderData] = useState(null); // Trạng thái chờ thanh toán từ VNPay
  const location = useLocation();
  const [loadingCheckOut, setIsLoadingCheckOut] = useState(false); // Trạng thái loading khi Đặt hàng

  // Tổng tiền của các sản phẩm có trong đơn
  // được cập nhật khi order thay đổi
  const subtotal = useMemo(() => {
    return order?.orderItemsSelected?.reduce((total, item) => total + item.price * item.amount, 0);
  }, [order]);
  // Tổng tiền tiết kiệm
  // được cập nhật khi Đơn hàng thay đổi
  const totalDiscount = useMemo(() => {
    return order?.orderItemsSelected?.reduce((total, item) => {
      const discount = item.discount || 0;
      return total + item.price * item.amount * discount / 100;
    }, 0);
  }, [order]);
  // Phí giao hàng
  // được cập nhật khi người dùng thay đổi phương thức giao hàng
  const shippingFee = useMemo(() => {
    const selected = shippingMethods.find((s) => s.id === delivery);
    return selected ? selected.fee : 0;
  }, [delivery]);
  // Tổng tiền người dùng phải thanh toán
  const total = subtotal + shippingFee - totalDiscount;

  // Hook dùng để cập nhật thông tin người dùng
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data
    const res = UserService.updateUser(id, { ...rests }, token)
    return res
  })
  // Hook dùng để tạo đơn hàng mới
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data
    const res = OrderService.createOrder({ ...rests }, token)
    return res
  })

  const { isLoading, data } = mutationUpdate // Trạng thái và dữ liệu được lấy từ mutation cập nhật người dùng
  const { data: dataAdd, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder // Trạng thái và dữ liệu được lấy từ mutation tạo đơn hàng

  // Theo dõi kết quả đặt hàng (mutationAddOrder) để xử lý điều hướng và thông báo
  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      message.success('Đặt hàng thành công')
      setIsLoadingCheckOut(false)
      navigate('/order_history')
    } else if (isError) {
      setIsLoadingCheckOut(false)
      message.error('Đặt hàng thất bại');
    }
  }, [isSuccess, isError]);

  // Hàm tạo đơn hàng
  const handleAddOrder = (isPaid) => {
    form.validateFields().then((values) => {
      setIsLoadingCheckOut(true)
      if (user?.access_token && order?.orderItemsSelected) {
        mutationAddOrder.mutate(
          {
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: values.name,
            address: values.address,
            phone: values.phone,
            paymentMethod: paymentMethods.find((p) => p.id === payment).name,
            shippingMethod: shippingMethods.find((s) => s.id === delivery).name,
            itemsPrice: subtotal,
            totalDiscount: totalDiscount,
            shippingPrice: shippingFee,
            totalPrice: total,
            user: user?.id,
            email: user?.email,
            isPaid: isPaid // Thêm trường isPaid
          }
        );
      }
    }).catch((errorInfo) => {
      console.log('Validation Failed:', errorInfo);
    });
  }

  // Hàm lấy dữ liệu từ người dùng, form, ... để thực hiện thanh toán
  const getOrderData = (values) => ({
    token: user?.access_token,
    orderItems: order?.orderItemsSelected,
    fullName: values.name,
    address: values.address,
    phone: values.phone,
    paymentMethod: paymentMethods.find((p) => p.id === payment).name,
    shippingMethod: shippingMethods.find((s) => s.id === delivery).name,
    itemsPrice: subtotal,
    totalDiscount: totalDiscount,
    shippingPrice: shippingFee,
    totalPrice: total,
    user: user?.id,
    email: user?.email
  });

  // Xử lý callback từ VNPay qua URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('vnp_ResponseCode');
  
    if (paymentStatus) {
      const savedForm = localStorage.getItem('checkoutForm');
      if (savedForm) {
        const values = JSON.parse(savedForm);
        form.setFieldsValue({
          name: values.fullName,
          address: values.address,
          phone: values.phone
        });
      }
  
      const transactionData = {
        amount: params.get('vnp_Amount'),
        bankCode: params.get('vnp_BankCode'),
        transactionNo: params.get('vnp_TransactionNo'),
        responseCode: paymentStatus,
        orderInfo: params.get('vnp_OrderInfo'),
        payDate: params.get('vnp_PayDate')
      };
  
      if (paymentStatus === '00') {
        message.success('Thanh toán thành công');
  
        const savedOrderData = localStorage.getItem('pendingOrder');
        if (savedOrderData) {
          const restoredOrder = JSON.parse(savedOrderData);
          const orderData = {
            ...restoredOrder,
            token: user?.access_token,
            isPaid: true,
          };
  
          mutationAddOrder.mutate(orderData);
          localStorage.removeItem('pendingOrder');
        }
  
      } else if (paymentStatus === '24') {
        message.warning('Bạn đã hủy thanh toán');
      } else {
        message.error(`Thanh toán thất bại: Mã lỗi ${paymentStatus}`);
      }
  
      // Dọn dẹp localStorage và URL
      localStorage.removeItem('checkoutForm');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <ContainerComponent>
      <Loading isLoading={isLoadingAddOrder || loadingCheckOut}>
        <OrderDetailWrapper>
          {/* Tạo Breadcrumb ở đầu trang */}
          <BreadcrumbComponent
            breadcrumbs={[
              { name: 'Trang chủ', link: '/' },
              { name: 'Giỏ hàng', link: '/order' },
              { name: 'Thanh toán', isCurrent: true }
            ]}
          />

          <Title level={3}>Thanh toán</Title>
          <Form form={form} layout="vertical">
            {/* Thông tin người nhận  */}
            <Card title="Thông tin người nhận" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                  <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Nhập địa chỉ giao hàng" autoSize={{ minRows: 3 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Phương thức giao hàng */}
            <Card title="Phương thức giao hàng" style={{ marginBottom: 16 }}>
              <Radio.Group
                onChange={(e) => setDelivery(e.target.value)}
                value={delivery}
              >
                <Row gutter={[16, 16]}>
                  {shippingMethods.map((method) => (
                    <Col span={24} key={method.id}>
                      <Radio value={method.id}>
                        {method.name} ({convertPrice(method.fee)})
                      </Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Card>

            {/* Phương thức thanh toán */}
            <Card title="Phương thức thanh toán" style={{ marginBottom: 16 }}>
              <Radio.Group
                onChange={(e) => setPayment(e.target.value)}
                value={payment}
              >
                <Row gutter={[16, 16]}>
                  {paymentMethods.map((method) => (
                    <Col span={24} key={method.id}>
                      <Radio value={method.id}>{method.name}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Card>

            {/* Danh sách sản phẩm + Tổng tiền */}
            <Card title="Đơn hàng của bạn" style={{ marginBottom: "16px" }}>
              {order?.orderItemsSelected?.map((orderItem) => (
                <Row key={orderItem?.product} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
                  <Col span={16} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar shape="square" size={48} src={orderItem?.image} alt={orderItem?.name} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{orderItem?.name}</div>
                      <div style={{ fontSize: 13, color: "#666" }}>
                        Số lượng: {orderItem?.amount}
                      </div>
                    </div>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <p>{convertPrice(orderItem?.price * orderItem?.amount)}</p>
                    {orderItem?.discount > 0 && (
                      <p>
                        - {convertPrice(orderItem?.price * orderItem?.amount * orderItem?.discount / 100)}
                      </p>
                    )}
                  </Col>
                </Row>
              ))}
              <Divider />
              <Row justify="space-between">
                <Text>Tạm tính:</Text>
                <Text>{convertPrice(subtotal)}</Text>
              </Row>
              {order?.discount > 0 && (
                <Row justify="space-between">
                  <Text>Tiết kiệm:</Text>
                  <Text>{convertPrice(totalDiscount)}</Text>
                </Row>
              )}
              <Row justify="space-between">
                <Text>Phí giao hàng:</Text>
                <Text>{convertPrice(shippingFee)}</Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: 8 }}>
                <Title level={4}>Tổng cộng:</Title>
                <Title level={4}>{convertPrice(total)}</Title>
              </Row>
            </Card>

            {/* Nút đặt hàng */}
            <Row justify="end">
              {/* Thanh toán bằng Paypal */}
              {payment === "paypal" ? (
                <PayPalButtonComponent
                amount={convertVNDToUSD(total)}
                onSuccess={() => handleAddOrder(true)} // Truyền true khi thanh toán thành công
                onError={() => {
                  message.error('Thanh toán PayPal thất bại');
                  handleAddOrder(false); // Truyền false nếu thanh toán thất bại
                }}
              />
              ) : payment === "vnpay" ? (
                // Thanh toán bằng VNPay
                <VNPayButton
                  amount={total}
                  orderInfo={`Thanh toán đơn hàng từ ${user?.email}`}
                  orderType="other"
                  orderData={getOrderData(form.getFieldsValue())}
                  setPendingOrder={setPendingOrderData} // Truyền hàm setState từ component cha
                  onSuccess={() => navigate('/order_history')}
                  onError={() => message.error('Lỗi thanh toán VNPay')}
                />
              ) : (
                // Thanh toán khi nhận hàng
                <ButtonComponent
                  onClick={() => { handleAddOrder(false) }}
                  size="large"
                  styleButton={{
                    backgroundColor: 'brown',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    marginBottom: '10px',
                  }}
                  styleTextButton={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  textButton="ĐẶT HÀNG"
                />
              )}
            </Row>
          </Form>
        </OrderDetailWrapper>
      </Loading>
    </ContainerComponent>
  );
};

export default CheckoutPage;