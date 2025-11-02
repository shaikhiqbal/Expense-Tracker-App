import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export default function LineChart({ data }: LineChartProps) {
  const defaultData = [
    { month: 'Jan', income: 4500, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 2800 },
    { month: 'Mar', income: 4800, expense: 3500 },
    { month: 'Apr', income: 5500, expense: 3100 },
    { month: 'May', income: 5000, expense: 3400 },
    { month: 'Jun', income: 5800, expense: 2900 },
  ];

  const chartData =
    data && Array.isArray(data) && data.length > 0 ? data : defaultData;

  const chartDataConfig = {
    labels: chartData.map((d) => d.month),
    datasets: [
      {
        label: 'Income',
        data: chartData.map((d) => d.income),
        borderColor: '#59BA89',
        backgroundColor: '#59BA89',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: chartData.map((d) => d.expense),
        borderColor: '#01575A',
        backgroundColor: '#01575A',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  return <Line data={chartDataConfig} options={options} />;
}
