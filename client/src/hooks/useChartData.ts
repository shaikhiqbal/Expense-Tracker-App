import { useMemo } from 'react';
import { useAppSelector } from './redux';

export const useChartData = () => {
  const { transactions } = useAppSelector(state => state.transactions);

  const monthlyData = useMemo(() => {
    const monthlyStats = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short' });
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      acc[month][transaction.type] += transaction.amount;
      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

    return Object.entries(monthlyStats).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense
    }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categoryStats = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryStats).map(([category, amount]) => ({
      category,
      amount
    }));
  }, [transactions]);

  return { monthlyData, categoryData };
};