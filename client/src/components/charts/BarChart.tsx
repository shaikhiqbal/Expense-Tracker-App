import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export default function BarChart({ data }: BarChartProps) {
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
        backgroundColor: '#59BA89',
        borderColor: '#59BA89',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: chartData.map((d) => d.expense),
        backgroundColor: '#01575A',
        borderColor: '#01575A',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
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

  return <Bar data={chartDataConfig} options={options} />;
}
