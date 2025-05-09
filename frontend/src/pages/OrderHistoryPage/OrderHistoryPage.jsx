import React, { useEffect, useState } from "react";
import {
    Tabs,
    Card,
    Button,
    Row,
    Col,
    Empty,
    Tag,
    Modal,
    message,
    Spin
} from "antd";
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
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
const { TabPane } = Tabs; //Khai báo để sử dụng trực tiếp trong JSX

const OrderHistoryPage = () => {
    const user = useSelector((state) => state.user); // Lấy thông tin người dùng
    const queryClient = useQueryClient(); // Làm mới cache
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [isFinishUpdated, setIsFinishUpdated] = useState(false); //Trạng thái loading
    const navigate = useNavigate()
    // Lấy Đơn hàng theo Người dùng
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
    // Mutation cập nhật trạng thái Đơn hàng
    const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
        return OrderService.updatedOrder(id, rests, token);
    });
    // Mutation xóa Đơn hàng
    const mutationDelete = useMutationHooks(({ id, token }) => {
        return OrderService.deleteOrder(id, token);
    });
    // Trạng thái và dữ liệu trả về từ mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    // Hàm hủy đơn hàng
    const cancelOrder = (orderId) => {
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
                setIsFinishUpdated(true);
                try {
                    mutationUpdate.mutate({
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
    // Hàm xóa Đơn hàng
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
                className: 'modal-cancel-btn'
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
                setIsFinishUpdated(true);
                try {
                    mutationDelete.mutate({
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
    // Theo dõi việc cập nhật trạng thái Đơn hàng
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Hủy đơn thành công');
            queryClient.invalidateQueries(['orders']);
            setIsFinishUpdated(false);
        } else if (dataUpdated?.status === 'ERR') {
            setIsFinishUpdated(false);
            message.error('Hủy đơn thất bại!');
        }
    }, [isSuccessUpdated, isErrorUpdated]);
    // Theo dõi việc xóa Đơn hàng
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Xóa đơn thành công');
            queryClient.invalidateQueries(['orders']);
            setIsFinishUpdated(false);
        } else if (dataDeleted?.status === 'ERR') {
            message.error('Xóa đơn thất bại!');
            setIsFinishUpdated(false);
        }
    }, [isSuccessDeleted, isErrorDeleted]);
    // Hàm định dạng lại thời gian tạo Đơn hàng
    const formatOrderDate = (dateString) => {
        const date = new Date(dateString);
        // Format date: DD/MM/YYYY
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        // Format time: HH:MM
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `ngày ${day}/${month}/${year} lúc ${hours}:${minutes}`;
    };
    // Hàm tạo giao diện cho một Đơn hàng
    const renderOrder = (order) => {
        const firstProduct = order.orderItems[0];
        const formattedDate = formatOrderDate(order.createdAt);
        return (
            <Card
                key={order.createdAt}
                style={{ marginBottom: 16 }}
                title={`Đơn hàng vào ${formattedDate}`}
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
    // Định dạng Màu sắc hiển thị cho từng Trạng thái đơn hàng
    const getStateColor = (state) => {
        switch (state) {
            case "Đã đặt":
                return "blue";
            case "Đã xác nhận":
                return "green";
            case "Đang giao hàng":
                return "green";
            case "Đã giao hàng":
                return "orange";
            case "Đã hủy":
                return "red";
            default:
                return "gray"; // Trạng thái khác
        }
    };
    // Hàm lấy Trạng thái Đơn hàng
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
                {/* Tạo Breadcrumb ở đầu trang */}
                <BreadcrumbComponent
                    breadcrumbs={[
                        { name: "Trang chủ", link: "/" },
                        { name: "Lịch sử mua hàng", isCurrent: true },
                    ]}
                />
            </div>

            <Loading isLoading={isLoadingOrder || isFinishUpdated}>
                <div style={{ width: '100%' }}>
                    {/* Thông tin Đơn hàng */}
                    <h2 style={{ marginBottom: 16 }}>Đơn hàng của bạn</h2>
                    <Tabs defaultActiveKey="1" type="line"> {/* Chia Đơn hàng thành từng tab theo Trạng thái Đơn hàng */}
                        <TabPane tab="Tất cả" key="1">
                            {orders.length ? orders.map(renderOrder) : <Empty />}
                        </TabPane>
                        <TabPane tab="Đã đặt" key="2">
                            {getOrdersByState("Đã đặt").map(renderOrder)}
                        </TabPane>
                        <TabPane tab="Đã xác nhận" key="3">
                            {getOrdersByState("Đã xác nhận").map(renderOrder)}
                        </TabPane>
                        <TabPane tab="Đang giao hàng" key="4">
                            {getOrdersByState("Đang giao hàng").map(renderOrder)}
                        </TabPane>
                        <TabPane tab="Đã giao hàng" key="5">
                            {getOrdersByState("Đã giao hàng").map(renderOrder)}
                        </TabPane>
                        <TabPane tab="Đã hủy" key="6">
                            {getOrdersByState("Đã hủy").map(renderOrder)}
                        </TabPane>
                    </Tabs>
                </div>
            </Loading>
        </ContainerComponent>
    );
};

export default OrderHistoryPage;