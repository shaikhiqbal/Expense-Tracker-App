import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchTransactions,
  searchTransactions,
  setPagination,
} from '../../features/transactions/transactionsSlice';
import { TransactionFilters } from '../../features/transactions/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { formatCurrency } from '../../utils/formatCurrency';
import { AddTransactionModal } from './AddTransactionModal';

export const TransactionsTable = () => {
  const dispatch = useAppDispatch();
  const { transactions, total, loading, pagination } = useAppSelector(
    (state) => state.transactions
  );

  const [filters, setFilters] = useState<TransactionFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchTransactions(pagination));
    }
  }, [dispatch, pagination, isSearching]);

  const handlePageChange = (newOffset: number) => {
    dispatch(setPagination({ ...pagination, offset: newOffset }));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setPagination({ offset: 0, limit: newLimit }));
  };

  const handleSearch = () => {
    if (Object.values(filters).some((value) => value)) {
      setIsSearching(true);
      dispatch(searchTransactions(filters));
    } else {
      setIsSearching(false);
      dispatch(fetchTransactions(pagination));
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setIsSearching(false);
    dispatch(fetchTransactions(pagination));
  };

  const totalPages = Math.ceil(total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  const getTypeIcon = (type: string) => {
    return type === 'income' ? (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11l5-5m0 0l5 5m-5-5v12"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 13l-5 5m0 0l-5-5m5 5V6"
        />
      </svg>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className=" bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Transactions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your financial transactions
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Transaction
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  type:
                    value === 'all'
                      ? undefined
                      : (value as 'income' | 'expense'),
                })
              }
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Category"
              value={filters.category || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value || undefined,
                })
              }
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
            />

            {/* <Input
              placeholder="Description"
              value={filters.description || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  description: e.target.value || undefined,
                })
              }
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
            /> */}

            <Input
              type="number"
              placeholder="Amount"
              value={filters.amount || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  amount: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
            />

            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex-1 transition-all duration-200"
              >
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal open={showModal} onOpenChange={setShowModal} />

      {/* Table Container */}
      <div className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400 font-medium">
              Loading transactions...
            </span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No transactions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              Get started by adding your first transaction or adjust your search
              filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Description
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {transactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-900'
                        : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(transaction.date).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString(
                            'en-US',
                            { weekday: 'short' }
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          transaction.type === 'income'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        <span
                          className={`mr-1.5 ${
                            transaction.type === 'income'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {getTypeIcon(transaction.type)}
                        </span>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate block">
                        {transaction.description || 'No description'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-lg font-bold transition-all duration-200 ${
                            transaction.type === 'income'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isSearching && transactions.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Showing {pagination.offset + 1} to{' '}
                {Math.min(pagination.offset + pagination.limit, total)} of{' '}
                {total} entries
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Show:
                </span>
                <Select
                  value={pagination.limit.toString()}
                  onValueChange={(value) => handleLimitChange(Number(value))}
                >
                  <SelectTrigger className="w-20 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(pagination.offset - pagination.limit)
                }
                disabled={pagination.offset === 0}
                className="border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, currentPage - 2) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        handlePageChange((pageNum - 1) * pagination.limit)
                      }
                      className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                        pageNum === currentPage
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(pagination.offset + pagination.limit)
                }
                disabled={pagination.offset + pagination.limit >= total}
                className="border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
