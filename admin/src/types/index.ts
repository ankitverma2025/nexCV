// Same types as frontend
export interface Profile {
  _id: string;
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

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  order: number;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  gpa: string;
  achievements: string[];
  order: number;
}

export interface Skill {
  _id: string;
  category: string;
  skills: string[];
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  image: string;
  featured: boolean;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
