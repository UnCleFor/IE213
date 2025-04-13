import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Tag, Avatar } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent.jsx";
import { OrderDetailWrapper } from "./style.js";
import pic from "./pic.png"

const { Title, Text } = Typography;

const OrderDetailPage = ({ orderId }) => {
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // const res = await api.get(`/orders/${orderId}`);
        // setOrderDetail(res.data);
        setOrderDetail(mockOrderDetail); // Dữ liệu mẫu
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (!orderDetail) return <div>Loading...</div>;

  return (
    <ContainerComponent>
      <OrderDetailWrapper>
      <div style={{ width: "100%" }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Chi tiết đơn hàng #{orderDetail.id}
        </Title>

        <Card title="Thông tin giao hàng" bordered={false} style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text strong>Người nhận:</Text>
              <p>{orderDetail.receiver.name}</p>
              <Text strong>Số điện thoại:</Text>
              <p>{orderDetail.receiver.phone}</p>
              <Text strong>Địa chỉ:</Text>
              <p>{orderDetail.receiver.address}</p>
            </Col>
            <Col xs={24} md={12}>
              <Text strong>Hình thức giao hàng:</Text>
              <p>
                {orderDetail.shippingMethod.name} (
                {orderDetail.shippingMethod.fee.toLocaleString()}₫)
              </p>
              <Text strong>Hình thức thanh toán:</Text>
              <p>{orderDetail.paymentMethod}</p>
              <Text strong>Trạng thái: </Text>
              <Tag color={orderDetail.statusColor}> {orderDetail.status}</Tag>
            </Col>
          </Row>
        </Card>

        <Card title="Danh sách sản phẩm" bordered={false} style={{ marginBottom: 16 }}>
          {/* Header - chỉ hiển thị trên PC */}
          <Row
            gutter={[16, 8]}
            className="product-list-header" // chỉ cần class, không cần style inline display
            style={{
              fontWeight: "bold",
              borderBottom: "1px solidrgb(222, 222, 222)",
              paddingBottom: 8,
            }}
          >
            <Col md={6}>Sản phẩm</Col>
            <Col md={4}>Số lượng</Col>
            <Col md={6}>Đơn giá</Col>
            <Col md={8}>Thành tiền</Col>
          </Row>

          {orderDetail.products.map((product, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "12px 0",
              }}
            >
              <Row gutter={[16, 8]} align="middle" style={{ flexWrap: "wrap" }}>
                {/* Tên + ảnh */}
                <Col xs={24} md={6} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar shape="square" size={48} src={product.image} />
                  <span style={{ fontWeight: 500 }}>{product.name}</span>
                </Col>

                {/* Mobile view: dạng dọc */}
                <Col xs={24} md={0}>
                  <div style={{ marginTop: 8 }}>
                    <div><strong>Số lượng:</strong> {product.quantity}</div>
                    <div><strong>Đơn giá:</strong> {product.price.toLocaleString()}₫</div>
                    <div><strong>Thành tiền:</strong> <strong>{(product.price * product.quantity).toLocaleString()}₫</strong></div>
                  </div>
                </Col>

                {/* PC view: cột riêng biệt */}
                <Col xs={0} md={4}>{product.quantity}</Col>
                <Col xs={0} md={6}>{product.price.toLocaleString()}₫</Col>
                <Col xs={0} md={8} style={{ fontWeight: "bold" }}>
                  {(product.price * product.quantity).toLocaleString()}₫
                </Col>
              </Row>
            </div>
          ))}
        </Card>



        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Row justify="end">
            <Col xs={24} md={12} style={{ textAlign: "right" }}>
              <Text strong>Tạm tính: {orderDetail.subtotal.toLocaleString()}₫</Text>
              <br />
              <Text strong>Phí giao hàng: {orderDetail.shippingMethod.fee.toLocaleString()}₫</Text>
              <br />
              <Title level={4} style={{ marginTop: 8 }}>
                Tổng thanh toán: {orderDetail.total.toLocaleString()}₫
              </Title>
            </Col>
          </Row>
        </Card>

        {/* <Row justify="start" style={{ marginTop: 24 }}>
          <Button type="primary" onClick={() => window.history.back()}>
            Quay lại
          </Button>
        </Row> */}
      </div>
      </OrderDetailWrapper>
    </ContainerComponent>
  );
};

// Dữ liệu mẫu
const mockOrderDetail = {
  id: 10001,
  receiver: {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  shippingMethod: {
    name: "Giao hàng nhanh",
    fee: 30000,
  },
  paymentMethod: "Thanh toán khi nhận hàng",
  status: "Đã xác nhận",
  statusColor: "green",
  subtotal: 1800000,
  total: 1830000,
  products: [
    {
      name: "Sofa gỗ óc chó",
      image: pic,
      quantity: 1,
      price: 1200000,
    },
    {
      name: "Ghế bành cao cấp",
      image: pic,
      quantity: 2,
      price: 300000,
    },
  ],
};

export default OrderDetailPage;
