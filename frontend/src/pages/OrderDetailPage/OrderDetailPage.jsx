import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Tag, Avatar, Spin } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent.jsx";
import { OrderDetailWrapper } from "./style.js";
import * as OrderService from "../../services/OrderService.js"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils.js";
import Loading from "../../components/LoadingComponent/Loading.jsx";
import { useLocation } from "react-router-dom";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";

const { Title, Text } = Typography;

const OrderDetailPage = () => {
  const user = useSelector((state) => state.user)
  const { orderId } = useParams();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  console.log('orderId', orderId)

  const fetchOrderDetail = async (context) => {
    setIsLoadingDetail(true)
    const id = context?.queryKey && context?.queryKey[1]
    const token = context?.queryKey && context?.queryKey[2];
    if (!id || !token) throw new Error("Thiếu ID hoặc token");
    const res = await OrderService.getDetailOrder(id, user?.access_token);
    setIsLoadingDetail(false)
    return res.data
  };

  const { isLoading, data: orderDetail, isError, error } = useQuery({
    queryKey: ["orderDetail", orderId, user?.access_token],
    queryFn: fetchOrderDetail
  });

  console.log('data', orderDetail)

  const getStateColor = (state) => {
    switch (state) {
      case "Đã đặt":
        return "blue";
      case "Đã xác nhận":
        return "green";
      case "Đã giao hàng":
        return "purple";
      case "Đã hủy":
        return "red";
      default:
        return "gray"; // Trạng thái khác
    }
  };

  useEffect(() => {
    // const fetchOrderDetail = async () => {
    //   try {
    //     // const res = await api.get(`/orders/${orderId}`);
    //     // setOrderDetail(res.data);
    //     setOrderDetail(mockOrderDetail); // Dữ liệu mẫu
    //   } catch (err) {
    //     console.error("Error fetching order details:", err);
    //   }
    // };
    // fetchOrderDetail();
  }, [orderId]);

  if (!orderDetail) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
        <Spin tip="Đang tải thông tin đơn hàng..." size="large" />
      </div>
    );
  }

  return (
    <ContainerComponent>
      <OrderDetailWrapper>
        <BreadcrumbComponent
          breadcrumbs={[
            { name: 'Trang chủ', link: '/' },
            { name: 'Lịch sử mua hàng', link: '/order_history' },
            { name: 'Chi tiết đơn hàng', isCurrent: true }
          ]}
        />
        <div style={{ width: "100%" }}>
          <Title level={3} style={{ marginBottom: 16 }}>
            Chi tiết đơn hàng
          </Title>

          <Card title="Thông tin giao hàng" bordered={false} style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Text strong>Ngày tạo đơn:</Text>
                <p>
                  {new Date(orderDetail.createdAt).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
                <Text strong>Người nhận:</Text>
                <p>{orderDetail.shippingAddress.fullName}</p>
                <Text strong>Số điện thoại:</Text>
                <p>{orderDetail.shippingAddress.phone}</p>
                <Text strong>Địa chỉ:</Text>
                <p>{orderDetail.shippingAddress.address}</p>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Hình thức giao hàng:</Text>
                <p>
                  {orderDetail.shippingMethod} ({convertPrice(orderDetail.shippingPrice)})

                </p>
                <Text strong>Hình thức thanh toán:</Text>
                <p>{orderDetail.paymentMethod}</p>
                <Text strong>Trạng thái: </Text>
                <Tag color={getStateColor(orderDetail.state)}>{orderDetail.state}</Tag>
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
              <Col md={4}>Tiết kiệm</Col>
              <Col md={4}>Thành tiền</Col>
            </Row>

            {orderDetail.orderItems.map((product, index) => (
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
                      <div><strong>Số lượng:</strong> {product.amount}</div>
                      <div><strong>Đơn giá:</strong> {convertPrice(product.price)}</div>
                      <div>
                        <strong>Tiết kiệm:</strong>
                        {convertPrice(
                          product.price *
                          product.amount *
                          (product.product?.discount) / 100
                        )}
                      </div>
                      <div><strong>Thành tiền:</strong> <strong>{convertPrice((product.price * product.amount))}</strong></div>
                    </div>
                  </Col>

                  {/* PC view: cột riêng biệt */}
                  <Col xs={0} md={4}>{product.amount}</Col>
                  <Col xs={0} md={6}>{convertPrice(product.price)}</Col>
                  <Col xs={0} md={4}>
                    {product.product?.discount > 0 ? `${convertPrice(product.product.discount * product.price * product.amount / 100)}` : `${convertPrice(0)}`}
                  </Col>
                  <Col xs={0} md={4} style={{ fontWeight: "bold" }}>
                    {convertPrice(product.price * product.amount)}
                  </Col>
                </Row>
              </div>
            ))}
          </Card>



          <Card bordered={false} style={{ marginBottom: 16 }}>
            <Row justify="end">
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Text strong>Tạm tính: {convertPrice(orderDetail.itemsPrice)}</Text>
                <br />
                {orderDetail.totalDiscount > 0 && (
                  <>
                    <Text strong>Giảm giá: {convertPrice(orderDetail.totalDiscount)}</Text>
                    <br />
                  </>
                )}
                <Text strong>Phí giao hàng: {convertPrice(orderDetail.shippingPrice)}</Text>
                <br />
                <Title level={4} style={{ marginTop: 8 }}>
                  Tổng thanh toán: {convertPrice(orderDetail.totalPrice)}
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


export default OrderDetailPage;
