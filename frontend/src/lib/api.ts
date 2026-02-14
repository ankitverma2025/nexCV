import axios from 'axios';
import type { Profile, Experience, Education, Skill, Project, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Default username - can be configured via environment variable
const DEFAULT_USERNAME = process.env.NEXT_PUBLIC_DEFAULT_USERNAME || 'amal';

export const profileApi = {
  getProfile: async (username: string = DEFAULT_USERNAME): Promise<Profile> => {
    const response = await api.get<ApiResponse<Profile>>(`/api/profile/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch profile');
    }
    return response.data.data;
  },
};

export const experienceApi = {
  getExperiences: async (username: string = DEFAULT_USERNAME): Promise<Experience[]> => {
    const response = await api.get<ApiResponse<Experience[]>>(`/api/experience/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch experiences');
    }
    return response.data.data;
  },
};

export const educationApi = {
  getEducation: async (username: string = DEFAULT_USERNAME): Promise<Education[]> => {
    const response = await api.get<ApiResponse<Education[]>>(`/api/education/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch education');
    }
    return response.data.data;
  },
};

export const skillsApi = {
  getSkills: async (username: string = DEFAULT_USERNAME): Promise<Skill[]> => {
    const response = await api.get<ApiResponse<Skill[]>>(`/api/skills/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch skills');
    }
    return response.data.data;
  },
};

export const projectsApi = {
  getProjects: async (username: string = DEFAULT_USERNAME): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>(`/api/projects/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch projects');
    }
    return response.data.data;
  },
};

export default api;
