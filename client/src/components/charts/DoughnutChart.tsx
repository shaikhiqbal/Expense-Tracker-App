import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  income: number;
  expense: number;
}

export default function DoughnutChart({ income, expense }: DoughnutChartProps) {
  const defaultIncome = 5500;
  const defaultExpense = 3200;

  const chartIncome = income !== undefined ? income : defaultIncome;
  const chartExpense = expense !== undefined ? expense : defaultExpense;

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [chartIncome, chartExpense],
        backgroundColor: ['#59BA89', '#01575A'],
        borderColor: ['#59BA89', '#01575A'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const total = chartIncome + chartExpense;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
