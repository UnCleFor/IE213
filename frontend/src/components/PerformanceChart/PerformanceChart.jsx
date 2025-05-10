import { Card } from 'antd';
import { Line } from 'react-chartjs-2';
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

const PerformanceChart = ({ orders, isLoading = false }) => {
  // Không có đơn hàng
  if (!orders?.data) return null;

  // Nhóm đơn hàng theo ngày
  const dailyStats = orders.data.reduce((acc, order) => {
    const date = new Date(order.createdAt).toISOString().split('T')[0];
    // Nếu chưa có ngày này trong thống kê thì khởi tạo
    if (!acc[date]) {
      acc[date] = {
        date,
        count: 0,
        revenue: 0,
        avgOrderValue: 0
      };
    }

    // Cộng dồn số lượng đơn, doanh thu, và tính giá trị đơn trung bình
    acc[date].count += 1;
    acc[date].revenue += order.totalPrice;
    acc[date].avgOrderValue = acc[date].revenue / acc[date].count;

    return acc;
  }, {});

  // Sắp xếp các ngày theo thứ tự tăng dần
  const sortedDates = Object.values(dailyStats)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Chuẩn bị dữ liệu cho biểu đồ
  const data = {
    labels: sortedDates.map(d => d.date), // Trục x là các ngày
    datasets: [
      {
        label: 'Số đơn hàng',
        data: sortedDates.map(d => d.count), // Dữ liệu số lượng đơn
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y', // Gắn với trục y bên trái
      },
      {
        label: 'Doanh thu (VND)',
        data: sortedDates.map(d => d.revenue), // Dữ liệu doanh thu
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',  // Gắn với trục y bên phải
      }
    ],
  };

  return (
    <Loading isLoading={isLoading}>
      <Card title="Hiệu suất theo ngày" bordered={false}>
        <Line
          data={data}
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
                ticks: {
                  callback: function (value) {
                    return (value / 1000000).toFixed(1) + 'M';
                  }
                }
              },
            }
          }}
        />
      </Card>
    </Loading>
  );
};
export default PerformanceChart