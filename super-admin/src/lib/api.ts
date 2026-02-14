import axios from 'axios';
import type { ApiResponse, User, Stats, AuthResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('super_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('super_admin_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      '/api/super-admin/auth/login',
      { email, password }
    );
    if (!data.success || !data.data) throw new Error(data.error);
    localStorage.setItem('super_admin_token', data.data.token);
    return data.data;
  },
  logout: () => {
    localStorage.removeItem('super_admin_token');
    window.location.href = '/';
  },
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('super_admin_token');
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<ApiResponse<User[]>>('/api/super-admin/users');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  getById: async (id: string): Promise<{ user: any; profile: any }> => {
    const { data } = await api.get<ApiResponse<{ user: any; profile: any }>>(
      `/api/super-admin/users/${id}`
    );
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    const { data } = await api.delete<ApiResponse<any>>(
      `/api/super-admin/users/${id}`
    );
    if (!data.success) throw new Error(data.error);
  },
};

// Stats API
export const statsApi = {
  get: async (): Promise<Stats> => {
    const { data } = await api.get<ApiResponse<Stats>>('/api/super-admin/stats');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
};

export default api;
