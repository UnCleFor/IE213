import React, { useEffect, useState } from "react";
import { Tabs, Card, Button, Row, Col, Empty, Tag } from "antd";
import { Avatar } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent.jsx";
import {orderCardStyle,ProductImage} from "./style.js"; // Giả sử bạn đã thêm style trong file này.
import pic from "./pic.png"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
const { TabPane } = Tabs;

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // const res = await api.get('/orders');
                // setOrders(res.data);
                setOrders(mockOrders); // dùng mock data tạm
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const cancelOrder = (orderId) => {
        console.log("Hủy đơn:", orderId);
        // Gọi API hủy nếu cần
    };

    const renderOrder = (order) => {
        const firstProduct = order.products[0];
        const productTotal = firstProduct.price * firstProduct.quantity;

        return (
            <Card
                key={order.id}
                style={{ marginBottom: 16 }}
                title={`Đơn hàng #${order.id}`}
                extra={<Tag color={order.statusColor}>{order.status}</Tag>}
            
            >
                <Row gutter={[16, 16]} align="middle">
                    {/* Thông tin sản phẩm đầu tiên */}
                    <Col xs={24} md={16} style={{ display: "flex", gap: 16 }}>
                        <Avatar
                            shape="square"
                            size={64}
                            src={firstProduct?.image}
                            alt={firstProduct?.name}
                            style={{ marginTop: 11 }} // Điều chỉnh giá trị marginTop ở đây
                        />
                         {/* <ProductImage src={pic} alt="Sofa đơn" /> */}
                        <div>
                            <p>
                                <strong>Sản phẩm:</strong> {firstProduct?.name} (x{firstProduct.quantity})
                            </p>
                            <p><strong>Tổng tiền:</strong> {productTotal.toLocaleString()}₫</p>
                        </div>
                    </Col>

                    {/* Tổng tiền đơn + nút */}
                    <Col
                        xs={24}
                        md={8}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: 8,
                            //marginTop: "16px", // Thêm khoảng cách khi màn hình nhỏ
                        }}
                    >
                        <p style={{ fontWeight: "bold", marginBottom: 8,color:"black" }}>
                           Tổng cộng: {order.total.toLocaleString()}₫
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {order.status === "Đã đặt" && (
                                <Button danger onClick={() => cancelOrder(order.id)}>
                                    Hủy đơn
                                </Button>
                            )}
                        <ButtonComponent
                            //onClick={handleUpdate}
                            size="middle"
                            styleButton={{
                                backgroundColor: 'brown',
                                //padding: '12px 28px',
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
                            textButton="Xem chi tiết"
                            
                        />
                            
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    };

    const getOrdersByStatus = (status) => {
        return orders.filter((o) => o.status === status);
    };

    return (
        <ContainerComponent>
            <div style={{ width: '100%' }}>
                <h2 style={{ marginBottom: 16 }}>Đơn hàng của bạn</h2>
                <Tabs defaultActiveKey="1" type="line">
                    <TabPane tab="Tất cả" key="1">
                        {orders.length ? orders.map(renderOrder) : <Empty />}
                    </TabPane>
                    <TabPane tab="Đã đặt" key="2">
                        {getOrdersByStatus("Đã đặt").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã xác nhận" key="3">
                        {getOrdersByStatus("Đã xác nhận").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã mua" key="4">
                        {getOrdersByStatus("Đã mua").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã hủy" key="5">
                        {getOrdersByStatus("Đã hủy").map(renderOrder)}
                    </TabPane>
                </Tabs>
            </div>
        </ContainerComponent>
    );
};

const mockOrders = [
    {
        id: 1,
        products: [
            { name: "Bàn inox", image: pic, quantity: 2, price: 100000 },
        ],
        total: 200000,
        status: "Đã đặt",
        statusColor: "blue",
    },
    {
        id: 2,
        products: [
            { name: "Sofa thanh lịch", image: pic, quantity: 1, price: 450000 },
        ],
        total: 450000,
        status: "Đã xác nhận",
        statusColor: "green",
    },
    {
        id: 3,
        products: [
            { name: "Kệ sách quý tộc", image: pic, quantity: 1, price: 700000 },
        ],
        total: 700000,
        status: "Đã hủy",
        statusColor: "red",
    },
    {
        id: 4,
        products: [
            { name: "Thảm dát vàng", image: pic, quantity: 1, price: 500000 },
        ],
        total: 500000,
        status: "Đã mua",
        statusColor: "purple",
    },
];

export default OrderHistoryPage;
