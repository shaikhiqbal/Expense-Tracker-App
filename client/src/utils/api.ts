const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = API_BASE_URL.startsWith('http') 
    ? `${API_BASE_URL}${endpoint}`
    : endpoint;
    
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};