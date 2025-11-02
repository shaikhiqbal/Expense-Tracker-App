import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction, TransactionState, TransactionFilters } from './types';
import { transactionsAPI } from './transactionsAPI';

const initialState: TransactionState = {
  transactions: [],
  total: 0,
  loading: false,
  error: null,
  pagination: {
    offset: 0,
    limit: 10
  }
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (params?: { offset?: number; limit?: number }) => {
    return await transactionsAPI.getAll(params);
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction: Omit<Transaction, 'id'>) => {
    return await transactionsAPI.create(transaction);
  }
);

export const searchTransactions = createAsyncThunk(
  'transactions/search',
  async (filters: TransactionFilters) => {
    return await transactionsAPI.search(filters);
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
        state.total = action.payload.total;
        state.pagination.offset = action.payload.offset;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      // Add transaction
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        state.total += 1;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add transaction';
      })
      // Search transactions
      .addCase(searchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.total = action.payload.length;
      })
      .addCase(searchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search transactions';
      });
  }
});

export const { clearError, setPagination } = transactionsSlice.actions;
export default transactionsSlice.reducer;