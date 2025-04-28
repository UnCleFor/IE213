import React, { useEffect, useState } from "react";
import { Tabs, Card, Button, Row, Col, Empty, Tag, Modal, message, Spin } from "antd";
import { Avatar } from "antd";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent.jsx";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils.js";
import * as OrderService from '../../services/OrderService';
import "./style.css";
import { useMutationHooks } from "../../hooks/useMutationHook.js";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading.jsx";
import { useLocation } from "react-router-dom";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";
const { TabPane } = Tabs;

const OrderHistoryPage = () => {
    const user = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [isFinishUpdated, setIsFinishUpdated] = useState(false);
    const navigate = useNavigate()

    const { isLoading: isLoadingOrder, data: orders, isError, error } = useQuery({
        queryKey: ['orders', user.id, user.access_token],
        queryFn: async () => {
            if (!user?.access_token) {
                throw new Error('Access token không hợp lệ');
            }
            const response = await OrderService.getOrderByUserId(user.id, user.access_token);
            return response.data;
        },
        onError: () => {
            message.error('Không thể lấy đơn hàng');
        }
    });

    console.log('orders', orders)

    const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
        return OrderService.updatedOrder(id, rests, token);
    });
    const mutationDelete = useMutationHooks(({ id, token }) => {
        return OrderService.deleteOrder(id, token);
    });

    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;

    const cancelOrder = (orderId) => {
        console.log("Hủy đơn:", orderId)
        Modal.confirm({
            title: "Xác nhận hủy đơn",
            content: "Bạn có chắc chắn muốn hủy đơn này không?",
            okText: "Hủy đơn",
            cancelText: "Đóng",
            cancelButtonProps: {
                className: 'modal-cancel-btn',
            },
            okButtonProps: {
                style: {
                    backgroundColor: "brown",
                    color: "#fff",
                },
                loading: isLoadingUpdated,
            },
            onOk: async () => {
                setLoading(true);
                try {
                    await mutationUpdate.mutate({
                        id: orderId,
                        token: user.access_token,
                        state: "Đã hủy",
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const removeOrder = (orderId) => {
        Modal.confirm({
            title: <span style={{ color: "brown" }}>Xác nhận xóa đơn</span>,
            content: (
                <div style={{ color: "brown" }}>
                    Bạn có chắc chắn muốn xóa đơn này không? Đây là thao tác không thể hoàn tác.
                </div>
            ),
            okText: "Xóa",
            cancelText: "Đóng",
            cancelButtonProps: {
                className: 'modal-cancel-btn',
            },
            okButtonProps: {
                style: {
                    backgroundColor: "brown",
                    color: "#fff",
                },
                loading: isLoadingDeleted,
            },
            onOk: async () => {
                setLoading(true);
                try {
                    await mutationDelete.mutate({
                        id: orderId,
                        token: user.access_token,
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Hủy đơn thành công');
            queryClient.invalidateQueries(['orders']);
            setIsFinishUpdated(false);
        } else if (dataUpdated?.status === 'ERR') {
            setIsFinishUpdated(false);
            message.error('Hủy đơn thất bại!');
        }

        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Xóa đơn thành công');
            queryClient.invalidateQueries(['orders']);
        } else if (dataDeleted?.status === 'ERR') {
            message.error('Xóa đơn thất bại!');
        }
    }, [isSuccessUpdated, isErrorUpdated, isSuccessDeleted, isErrorDeleted]);

    const renderOrder = (order) => {
        const firstProduct = order.orderItems[0];

        return (
            <Card
                key={order._id}
                style={{ marginBottom: 16 }}
                title={`Đơn hàng #${order._id}`}
                extra={<Tag color={getStateColor(order.state)}>{order.state}</Tag>}

            >
                <Row gutter={[16, 16]} align="middle">
                    {/* Thông tin sản phẩm đầu tiên */}
                    <Col xs={24} md={16} style={{ display: "flex", gap: 16 }}>
                        <Avatar
                            shape="square"
                            size={64}
                            src={firstProduct?.image}
                            alt={firstProduct?.name}
                            style={{ marginTop: 11 }}
                        />
                        {/* <ProductImage src={pic} alt="Sofa đơn" /> */}
                        <div>
                            <p>
                                <strong>Người nhận:</strong> {order.shippingAddress?.fullName}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong> {order.shippingAddress?.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {order.shippingAddress?.address}
                            </p>
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
                        <p style={{ fontWeight: "bold", marginBottom: 8, color: "black" }}>
                            Tổng cộng: {convertPrice(order.totalPrice)}
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {order.state === "Đã đặt" && (
                                <Button danger onClick={() => cancelOrder(order._id)}>
                                    Hủy đơn
                                </Button>
                            )}
                            {order.state === "Đã hủy" && (
                                <Button danger onClick={() => removeOrder(order._id)}>
                                    Xóa đơn hàng
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
                                    marginBottom: '10px'
                                }}
                                styleTextButton={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                                textButton="Xem chi tiết"
                                onClick={() => navigate(`/order_detail/${order?._id}`)}
                            />

                        </div>
                    </Col>
                </Row>
            </Card>
        );
    };

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

    const getOrdersByState = (state) => {
        return orders.filter((o) => o.state === state);
    };

    if (!orders) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
                <Spin tip="Đang tải đơn hàng..." size="large" />
            </div>
        );
    }
    const styles = {
        breadcrumbWrapper: {
          marginBottom: 20,  // Điều chỉnh khoảng cách nếu cần
            // Đảm bảo rằng breadcrumb căn chỉnh với navbar
        },
      };

    return (
        <ContainerComponent>

            <div style={styles.breadcrumbWrapper}>
                <BreadcrumbComponent
                        breadcrumbs={[
                            { name: "Trang chủ", link: "/" },
                            { name: "Lịch sử mua hàng", isCurrent: true },
                        ]}
                    />
                </div>
                
            <div style={{ width: '100%' }}>
                <h2 style={{ marginBottom: 16 }}>Đơn hàng của bạn</h2>
                <Tabs defaultActiveKey="1" type="line">
                    <TabPane tab="Tất cả" key="1">
                        {orders.length ? orders.map(renderOrder) : <Empty />}
                    </TabPane>
                    <TabPane tab="Đã đặt" key="2">
                        {getOrdersByState("Đã đặt").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã xác nhận" key="3">
                        {getOrdersByState("Đã xác nhận").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã giao hàng" key="4">
                        {getOrdersByState("Đã giao hàng").map(renderOrder)}
                    </TabPane>
                    <TabPane tab="Đã hủy" key="5">
                        {getOrdersByState("Đã hủy").map(renderOrder)}
                    </TabPane>
                </Tabs>
            </div>
        </ContainerComponent>
    );
};

export default OrderHistoryPage;
