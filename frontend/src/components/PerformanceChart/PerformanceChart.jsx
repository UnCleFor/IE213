import { Card, Col, Row } from 'antd';
import { Bar, Pie, Line } from 'react-chartjs-2';
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
const PerformanceChart = ({ orders, isLoading=false }) => {
    if (!orders?.data) return null;
    
    // Nhóm đơn hàng theo ngày
    const dailyStats = orders.data.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      
      if (!acc[date]) {
        acc[date] = {
          date,
          count: 0,
          revenue: 0,
          avgOrderValue: 0
        };
      }
      
      acc[date].count += 1;
      acc[date].revenue += order.totalPrice;
      acc[date].avgOrderValue = acc[date].revenue / acc[date].count;
      
      return acc;
    }, {});
    
    const sortedDates = Object.values(dailyStats)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const data = {
      labels: sortedDates.map(d => d.date),
      datasets: [
        {
          label: 'Số đơn hàng',
          data: sortedDates.map(d => d.count),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Doanh thu (VND)',
          data: sortedDates.map(d => d.revenue),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y1',
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
                  callback: function(value) {
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