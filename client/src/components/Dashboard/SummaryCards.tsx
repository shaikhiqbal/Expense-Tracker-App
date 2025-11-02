import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export default function SummaryCards({ totalIncome, totalExpenses, balance }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Total Balance - Main Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold mb-1">{formatCurrency(balance)}</div>
          <div className="text-sm text-white/80">Total Balance</div>
          <div className="text-xs text-white/60 mt-2">+2.5% from last month</div>
        </CardContent>
      </Card>

      {/* Income */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-secondary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(totalIncome)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Income</div>
          <div className="text-xs text-secondary dark:text-secondary mt-2">+12% ↗</div>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(totalExpenses)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Expenses</div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-2">-8% ↘</div>
        </CardContent>
      </Card>

      {/* Savings */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(Math.max(0, totalIncome - totalExpenses))}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Savings</div>
          <div className="text-xs text-primary dark:text-primary mt-2">+5% ↗</div>
        </CardContent>
      </Card>
    </div>
  );
}