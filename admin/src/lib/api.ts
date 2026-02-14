import axios from 'axios';
import type { ApiResponse, Profile, Experience, Education, Skill, Project } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
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
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Profile API
export const profileApi = {
  get: async (): Promise<Profile> => {
    const { data } = await api.get<ApiResponse<Profile>>('/api/profile');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  update: async (profile: Partial<Profile>): Promise<Profile> => {
    const { data } = await api.put<ApiResponse<Profile>>('/api/profile', profile);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
};

// Experience API
export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    const { data } = await api.get<ApiResponse<Experience[]>>('/api/experience');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  create: async (exp: Partial<Experience>): Promise<Experience> => {
    const { data } = await api.post<ApiResponse<Experience>>('/api/experience', exp);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  update: async (id: string, exp: Partial<Experience>): Promise<Experience> => {
    const { data } = await api.put<ApiResponse<Experience>>(`/api/experience/${id}`, exp);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/experience/${id}`);
  },
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const { data } = await api.get<ApiResponse<Education[]>>('/api/education');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  create: async (edu: Partial<Education>): Promise<Education> => {
    const { data } = await api.post<ApiResponse<Education>>('/api/education', edu);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  update: async (id: string, edu: Partial<Education>): Promise<Education> => {
    const { data } = await api.put<ApiResponse<Education>>(`/api/education/${id}`, edu);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/education/${id}`);
  },
};

// Skills API
export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    const { data } = await api.get<ApiResponse<Skill[]>>('/api/skills');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  create: async (skill: Partial<Skill>): Promise<Skill> => {
    const { data } = await api.post<ApiResponse<Skill>>('/api/skills', skill);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  update: async (id: string, skill: Partial<Skill>): Promise<Skill> => {
    const { data } = await api.put<ApiResponse<Skill>>(`/api/skills/${id}`, skill);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/skills/${id}`);
  },
};

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get<ApiResponse<Project[]>>('/api/projects');
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  create: async (project: Partial<Project>): Promise<Project> => {
    const { data } = await api.post<ApiResponse<Project>>('/api/projects', project);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data } = await api.put<ApiResponse<Project>>(`/api/projects/${id}`, project);
    if (!data.success || !data.data) throw new Error(data.error);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/projects/${id}`);
  },
};

export default api;
