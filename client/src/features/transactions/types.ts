export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  offset: number;
  limit: number;
}

export interface TransactionState {
  transactions: Transaction[];
  total: number;
  loading: boolean;
  error: string | null;
  pagination: {
    offset: number;
    limit: number;
  };
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  description?: string;
  amount?: number;
  date?: string;
}