import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: async (email: string, username: string, password: string) => {
    const response = await api.post('/auth/register', { email, username, password });
    return response.data;
  },
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const todoService = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  getTodo: async (id: number) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },
  createTodo: async (title: string, description?: string) => {
    const response = await api.post('/todos', { title, description });
    return response.data;
  },
  updateTodo: async (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },
  deleteTodo: async (id: number) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};

export default api;
