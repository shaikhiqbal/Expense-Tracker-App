import Dashboard from '@/components/Dashboard/Dashboard';
import { TransactionsTable } from '../components/transactions/TransactionsTable';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your financial overview.</p>
            </div>
          </div>
        </div>
        <Dashboard />
        <div className="mt-8">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}