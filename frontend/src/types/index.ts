export interface User {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
}

export interface TodoFormData {
  title: string;
  description?: string;
  completed?: boolean;
}
