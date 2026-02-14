export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  hasProfile: boolean;
  profileData: Profile | null;
}

export interface Profile {
  _id: string;
  userId: string;
  fullName: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  about: string;
  profileImage: string;
  updatedAt: string;
}

export interface Stats {
  totalUsers: number;
  totalProfiles: number;
  recentUsers: number;
  profileCompletionRate: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}
