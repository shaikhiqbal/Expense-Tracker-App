import api from '../../lib/api';
import { Transaction, TransactionFilters, PaginatedResponse } from './types';

export const transactionsAPI = {
  getAll: async (params?: {
    offset?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Transaction>> => {
    const { data } = await api.get('/transaction', { params });
    return {
      data: data.data.transaction.map((t: any) => ({
        id: t._id,
        type: t.type,
        amount: t.amount,
        category: t.category,
        description: t.description || '',
        date: t.date
      })),
      total: data.data.total,
      offset: data.data.offset,
      limit: data.data.limit
    };
  },

  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const { data } = await api.post('/', transaction);
    return {
      id: data._id,
      type: data.type,
      amount: data.amount,
      category: data.category,
      description: data.description || '',
      date: data.date
    };
  },

  search: async (filters: TransactionFilters): Promise<Transaction[]> => {
    const { data } = await api.get('/search-transaction', { params: filters });
    return data.data.map((t: any) => ({
      id: t._id,
      type: t.type,
      amount: t.amount,
      category: t.category,
      description: t.description || '',
      date: t.date
    }));
  }
};