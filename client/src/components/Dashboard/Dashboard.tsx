import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';
import { useChartData } from '@/hooks/useChartData';
import SummaryCards from './SummaryCards';
import DoughnutChart from '../charts/DoughnutChart';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import DashboardSkeleton from '../common/DashboardSkeleton';

export default function Dashboard() {
  const {
    loading,
    error,
    totalIncome,
    totalExpenses,
    balance,
  } = useTransactions();

  const { monthlyData } = useChartData();
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <DoughnutChart income={totalIncome} expense={totalExpenses} />
            </div>
          </CardContent>
        </Card>

        {/* Line/Bar Chart Toggle */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Trends
              </CardTitle>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className={`h-8 px-3 text-xs text-white ${chartType === 'line' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  Line
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className={`h-8 px-3 text-xs text-white ${chartType === 'bar' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  Bar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {chartType === 'line' ? (
                <LineChart data={monthlyData} />
              ) : (
                <BarChart data={monthlyData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
