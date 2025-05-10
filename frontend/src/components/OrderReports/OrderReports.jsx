import { Card, Col, Row } from 'antd';
import { Bar, Pie, Line } from 'react-chartjs-2';
import * as UserService from '../../services/UserService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../LoadingComponent/Loading';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const OrderReports = ({ orders, access_token, isLoading = false }) => {
  const emailCache = useRef(new Map()); // Lưu cache email người dùng để tránh gọi API nhiều lần
  const [_, forceUpdate] = useState(false); // Trigger re-render khi cache được cập nhật
  // Hàm lấy Email Người dùng
  const handleGetUserEmail = async (id, access_token) => {
    try {
      const res = await UserService.getUserEmail(id, access_token);
      if (res?.status === "OK") {
        return res.data.email;
      }
      return "Không xác định";
    } catch (error) {
      console.error("Lỗi khi lấy email:", error);
      return "Lỗi tải email";
    }
  };

  // Preload emails
  useEffect(() => {
    const fetchEmails = async () => {
      const userIds = [...new Set(orders?.data?.map(order => order.user))];
      await Promise.all(
        userIds.map(id => {
          if (id && !emailCache.current.has(id)) {
            return handleGetUserEmail(id, access_token).then(email => {
              emailCache.current.set(id, email);
              forceUpdate(v => !v); // Cập nhật lại component sau khi fetch email
            });
          }
          return Promise.resolve();
        })
      );
    };

    if (orders?.data) {
      fetchEmails();
    }
  }, [orders, access_token]);

  const processData = () => {
    if (!orders?.data) return {};

    const orderData = orders.data;
    // Khởi tạo các đối tượng thống kê
    const paymentMethods = {};
    const paymentRevenue = {};
    const statusCount = {};
    const monthlyRevenue = {};
    const yearlyRevenue = {};
    const yearlyOrders = {};
    const customerSpending = {};
    // Duyệt qua từng đơn hàng và cập nhật dữ liệu
    orderData.forEach(order => {
      const date = new Date(order.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const year = date.getFullYear();

      // Đếm số lượng và doanh thu theo phương thức thanh toán
      paymentMethods[order.paymentMethod] = (paymentMethods[order.paymentMethod] || 0) + 1;
      paymentRevenue[order.paymentMethod] = (paymentRevenue[order.paymentMethod] || 0) + order.totalPrice;

      // Đếm trạng thái đơn hàng
      statusCount[order.state] = (statusCount[order.state] || 0) + 1;

      // Tổng hợp doanh thu theo tháng
      monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + order.totalPrice;

      // Tổng hợp doanh thu và số đơn theo năm
      yearlyRevenue[year] = (yearlyRevenue[year] || 0) + order.totalPrice;
      yearlyOrders[year] = (yearlyOrders[year] || 0) + 1;

      // Tổng chi tiêu của từng khách hàng
      const customerId = order.user || 'Unknown';
      customerSpending[customerId] = (customerSpending[customerId] || 0) + order.totalPrice;
    });

    return {
      paymentMethods,
      paymentRevenue,
      statusCount,
      monthlyRevenue,
      yearlyRevenue,
      yearlyOrders,
      customerSpending,
    };
  };

  const reportData = processData();

  // Chuẩn bị dữ liệu cho biểu đồ: Phương thức thanh toán
  const paymentData = {
    labels: Object.keys(reportData.paymentMethods || {}),
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: Object.values(reportData.paymentMethods || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chuẩn bị dữ liệu cho biểu đồ: Trạng thái đơn hàng
  const statusData = {
    labels: Object.keys(reportData.statusCount || {}),
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: Object.values(reportData.statusCount || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Biểu đồ doanh thu theo tháng
  const revenueData = {
    labels: Object.keys(reportData.monthlyRevenue || {}),
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: Object.values(reportData.monthlyRevenue || {}),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  // Biểu đồ doanh thu theo năm
  const yearlyRevenueData = {
    labels: Object.keys(reportData.yearlyRevenue || {}).sort(),
    datasets: [
      {
        label: 'Doanh thu theo năm (VND)',
        data: Object.values(reportData.yearlyRevenue || {}),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Biểu đồ số lượng đơn hàng theo năm
  const yearlyOrdersData = {
    labels: Object.keys(reportData.yearlyOrders || {}).sort(),
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: Object.values(reportData.yearlyOrders || {}),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Lấy top 5 khách hàng có chi tiêu cao nhất
  const topCustomers = Object.keys(reportData.customerSpending || {})
    .sort((a, b) => reportData.customerSpending[b] - reportData.customerSpending[a])
    .slice(0, 5);

  // Biểu đồ chi tiêu của top 5 khách hàng
  const topCustomersLabels = topCustomers.map((customerId) => 
    emailCache.current.get(customerId) || 'Loading...'
  );

  const topCustomersData = {
    labels: topCustomersLabels,
    datasets: [
      {
        label: 'Chi tiêu',
        data: topCustomers.map((id) => reportData.customerSpending[id]),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Biểu đồ doanh thu theo phương thức thanh toán
  const paymentRevenueData = {
    labels: Object.keys(reportData.paymentRevenue || {}),
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: Object.values(reportData.paymentRevenue || {}),
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Biểu đồ số lượng đơn hàng theo tháng trong năm hiện tại
  const currentYear = new Date().getFullYear();
  const monthlyOrdersCurrentYear = Array(12).fill(0);
  orders?.data?.forEach(order => {
    const date = new Date(order.createdAt);
    if (date.getFullYear() === currentYear) {
      monthlyOrdersCurrentYear[date.getMonth()] += 1;
    }
  });

  const monthlyOrdersData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: `Số đơn hàng năm ${currentYear}`,
        data: monthlyOrdersCurrentYear,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };



    
return (
    <Loading isLoading={isLoading}>
    <div style={{ padding: '20px' }}>
        <h2>Báo Cáo Thống Kê Đơn Hàng</h2>

        {/* Tổng quan */}
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            <Col span={8}>
                <Card title="Tổng số đơn hàng" bordered={false}>
                    <h2 style={{ fontSize: '32px', margin: 0 }}>{orders?.data?.length || 0}</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Tổng doanh thu" bordered={false}>
                    <h2 style={{ fontSize: '32px', margin: 0 }}>
                        {orders?.data?.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString('vi-VN')} ₫
                    </h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Đơn hàng trung bình" bordered={false}>
                    <h2 style={{ fontSize: '32px', margin: 0 }}>
                        {(
                            orders?.data?.length
                                ? orders.data.reduce((sum, order) => sum + order.totalPrice, 0) / orders.data.length
                                : 0
                        ).toLocaleString('vi-VN')} ₫
                    </h2>
                </Card>
            </Col>
        </Row>

        {/* Doanh thu theo năm và tháng */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={12}>
                <Card title="Doanh thu theo năm" bordered={false}>
                    <Bar
                        data={yearlyRevenueData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Doanh thu theo năm' },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: (value) => value.toLocaleString('vi-VN') + ' ₫',
                                    },
                                },
                            },
                        }}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Doanh thu theo tháng" bordered={false}>
                    <Line
                        data={revenueData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Doanh thu theo tháng' },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: (value) => value.toLocaleString('vi-VN') + ' ₫',
                                    },
                                },
                            },
                        }}
                    />
                </Card>
            </Col>
        </Row>

        {/* Số lượng đơn hàng và top khách hàng */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={12}>
                <Card title="Số lượng đơn hàng theo năm" bordered={false}>
                    <Bar data={yearlyOrdersData} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title={`Số đơn hàng theo tháng năm ${currentYear}`} bordered={false}>
                    <Line data={monthlyOrdersData} />
                </Card>
            </Col>
        </Row>

        {/* Phương thức thanh toán và trạng thái đơn hàng */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={12}>
                <Card title="Phân bổ đơn hàng theo phương thức thanh toán" bordered={false}>
                    <Bar
                        data={paymentData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Phương thức thanh toán' },
                            },
                        }}
                    />
                </Card>
            </Col>

            <Col span={12}>
                <Card title="Top 5 khách hàng chi tiêu nhiều nhất" bordered={false}>
                    <Bar data={topCustomersData} />
                </Card>
            </Col>

            
        </Row>

        {/* Doanh thu theo phương thức thanh toán và đơn hàng theo tháng năm hiện tại */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={12}>
                <Card title="Doanh thu theo phương thức thanh toán" bordered={false}>
                    <Pie data={paymentRevenueData} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Phân bổ đơn hàng theo trạng thái" bordered={false}>
                    <Pie
                        data={statusData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Trạng thái đơn hàng' },
                            },
                        }}
                    />
                </Card>
            </Col>
        </Row>
    </div>
    </Loading>
);
};
export default OrderReports;