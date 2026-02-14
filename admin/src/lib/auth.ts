import api from './api';
import type { AuthResponse, ApiResponse } from '@/types';

const TOKEN_KEY = 'admin_token';
const USERNAME_KEY = 'admin_username';

export const authLib = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },

  getUsername(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(USERNAME_KEY);
  },

  setUsername(username: string): void {
    localStorage.setItem(USERNAME_KEY, username);
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', {
      email,
      password,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Login failed');
    }

    const { token, user } = response.data.data;
    this.setToken(token);
    this.setUsername(user.username);
    return { token, user };
  },

  async register(email: string, password: string, name: string, username: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', {
      email,
      password,
      name,
      username,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Registration failed');
    }

    const { token, user } = response.data.data;
    this.setToken(token);
    this.setUsername(user.username);
    return { token, user };
  },

  async verify(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await api.get<ApiResponse<any>>('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.success;
    } catch {
      return false;
    }
  },

  logout(): void {
    this.removeToken();
    window.location.href = '/login';
  },
};
