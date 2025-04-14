import React, { useState, useMemo } from "react";
import { Card, Row, Col, Typography, Radio, Input, Button, Form, message, Divider, Avatar } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { OrderDetailWrapper } from "./style";
import pic from "./pic.png"; // ảnh mặc định sản phẩm
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

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

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, []);

  const shippingFee = useMemo(() => {
    const selected = shippingMethods.find((s) => s.id === selectedShipping);
    return selected ? selected.fee : 0;
  }, [selectedShipping]);

  const total = subtotal + shippingFee;

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

  return (
    <ContainerComponent>
      <OrderDetailWrapper>
        <Title level={3}>Thanh toán</Title>
        <Form layout="vertical" onFinish={onFinish}>
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
            {cartItems.map((item, index) => (
              <Row key={index} justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                <Col span={16} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar shape="square" size={48} src={item.image} />
                  <div>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#666" }}>
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  {(item.price * item.quantity).toLocaleString()}₫
                </Col>
              </Row>
            ))}
            <Divider />
            <Row justify="space-between">
              <Text>Tạm tính:</Text>
              <Text>{subtotal.toLocaleString()}₫</Text>
            </Row>
            <Row justify="space-between">
              <Text>Phí giao hàng:</Text>
              <Text>{shippingFee.toLocaleString()}₫</Text>
            </Row>
            <Row justify="space-between" style={{ marginTop: 8 }}>
              <Title level={4}>Tổng cộng:</Title>
              <Title level={4}>{total.toLocaleString()}₫</Title>
            </Row>
          </Card>

          {/* Nút đặt hàng */}
          <Row justify="end">
          <ButtonComponent
                            //onClick={handleUpdate}
                            size="large"
                            styleButton={{
                                backgroundColor: 'brown',
                                padding: '12px 28px',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                marginBottom:'10px'
                            }}
                            styleTextButton={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            textButton="Mua hàng"
                            
                        />
          </Row>
        </Form>
      </OrderDetailWrapper>
    </ContainerComponent>
  );
};

export default CheckoutPage;
