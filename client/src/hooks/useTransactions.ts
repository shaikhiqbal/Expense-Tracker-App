import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { fetchTransactions, addTransaction, searchTransactions } from '../features/transactions/transactionsSlice';
import { Transaction, TransactionFilters } from '../features/transactions/types';

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, total, loading, error, pagination } = useAppSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions(pagination));
  }, [dispatch]);

  const addNewTransaction = (transaction: Omit<Transaction, 'id'>) => {
    dispatch(addTransaction(transaction));
  };

  const searchTransactionsByFilters = (filters: TransactionFilters) => {
    dispatch(searchTransactions(filters));
  };

  const loadTransactions = (params?: { offset?: number; limit?: number }) => {
    dispatch(fetchTransactions(params));
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return {
    transactions,
    total,
    loading,
    error,
    pagination,
    addNewTransaction,
    searchTransactionsByFilters,
    loadTransactions,
    totalIncome,
    totalExpenses,
    balance
  };
};