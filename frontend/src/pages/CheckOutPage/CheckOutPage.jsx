import React, { useState, useMemo } from "react";
import { Card, Row, Col, Typography, Radio, Input, Button, Form, message, Divider, Avatar } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { OrderDetailWrapper } from "./style";
import pic from "./pic.png"; // ảnh mặc định sản phẩm
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService"
import * as UserService from "../../services/UserService"
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";

const { Title, Text } = Typography;

// Dữ liệu giỏ hàng có avatar
const cartItems = [
  { name: "Sofa cao cấp", quantity: 1, price: 1200000, image: pic },
  { name: "Bàn gỗ tự nhiên", quantity: 2, price: 500000, image: pic },
];

const shippingMethods = [
  { id: "fast", name: "Giao hàng nhanh", fee: 30000 },
  { id: "standard", name: "Giao hàng tiêu chuẩn", fee: 20000 },
];

const paymentMethods = [
  { id: "cod", name: "Thanh toán khi nhận hàng" },
  { id: "bank", name: "Chuyển khoản ngân hàng" },
];

const CheckoutPage = () => {
  const [selectedShipping, setSelectedShipping] = useState("fast");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [form] = Form.useForm(); // Tạo form instance

  const onFinish = (values) => {
    const orderInfo = {
      ...values,
      shippingMethod: shippingMethods.find((s) => s.id === selectedShipping),
      paymentMethod: paymentMethods.find((p) => p.id === selectedPayment).name,
      cartItems,
      subtotal,
      total,
    };
    console.log("Order Info:", orderInfo);
    message.success("Đặt hàng thành công!");
  };

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const subtotal = useMemo(() => {
    return order?.orderItemsSelected?.reduce((total, item) => total + item.price * item.amount, 0);
  }, [order]);
  const totalDiscount = useMemo(() => {
    return order?.orderItemsSelected?.reduce((total, item) => total + item.price * item.amount * item.discount/100, 0);
  }, [order]);
  const shippingFee = useMemo(() => {
    const selected = shippingMethods.find((s) => s.id === selectedShipping);
    return selected ? selected.fee : 0;
  }, [selectedShipping]);
  const total = subtotal + shippingFee - totalDiscount;

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data
    const res = UserService.updateUser(id, { ...rests }, token)
    return res
  })

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data
    const res = OrderService.createOrder({ ...rests }, token)
    return res
  })

  const { isLoading, data } = mutationUpdate
  const { isLoading: isLoadingAddOrder } = mutationAddOrder 

  const handleAddOrder = () => {
    form.validateFields().then((values) => {
      if(user?.access_token && order?.orderItemsSelected) {
        mutationAddOrder.mutate(
          {
            token: user?.access_token, 
            orderItems: order?.orderItemsSelected,
            fullName: values.name, 
            address: values.address, 
            phone: values.phone,
            paymentMethod: paymentMethods.find((p) => p.id === selectedPayment).name,
            itemsPrice: subtotal,
            totalDiscount: totalDiscount,
            shippingPrice: shippingFee,
            totalPrice: total,
            user: user?.id
          },
          {
            onSuccess: () => {
              message.success('Đặt hàng thành công');
            }
          }
        );
      }
    }).catch((errorInfo) => {
      console.log('Validation Failed:', errorInfo);
    });
  }

  return (
    <ContainerComponent>
      <OrderDetailWrapper>
        <Title level={3}>Thanh toán</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Thông tin người nhận */}
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
              onChange={(e) => setSelectedShipping(e.target.value)}
              value={selectedShipping}
            >
              <Row gutter={[16, 16]}>
                {shippingMethods.map((method) => (
                  <Col span={24} key={method.id}>
                    <Radio value={method.id}>
                      {method.name} ({method.fee.toLocaleString()}₫)
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Card>

          {/* Phương thức thanh toán */}
          <Card title="Phương thức thanh toán" style={{ marginBottom: 16 }}>
            <Radio.Group
              onChange={(e) => setSelectedPayment(e.target.value)}
              value={selectedPayment}
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
          <Card title="Đơn hàng của bạn" style={{ marginBottom: 16 }}>
            {order?.orderItemsSelected?.map((orderItem) => (
              <Row key={orderItem?.product} justify="space-between" align="middle" style={{ marginBottom: 12 }}>
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
                  {orderItem?.discount && (
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
            <Row justify="space-between">
              <Text>Giảm giá:</Text>
              <Text>{convertPrice(totalDiscount)}</Text>
            </Row>
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
            <ButtonComponent
              onClick={() => { handleAddOrder() }}
              size="large"
              styleButton={{
                backgroundColor: 'brown',
                padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '10px'
              }}
              styleTextButton={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              textButton="THANH TOÁN"
            />
          </Row>
        </Form>
      </OrderDetailWrapper>
    </ContainerComponent>
  );
};

export default CheckoutPage;