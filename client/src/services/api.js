import axios from 'axios';

// Create axios instance with base configuration
const getBaseURL = () => {
  // Check if we're on mobile or if localhost doesn't work
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isMobile || !isLocalhost) {
    // Use your computer's IP address for mobile access
    return import.meta.env.VITE_API_URL || 'http://10.144.97.4:5000/api';
  }
  
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const baseURL = getBaseURL();
console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 15000, // Increased timeout for mobile
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection and try again.';
    }
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Let calling code handle 401 to avoid hard reloads and routing glitches
      // Example: AuthContext will clear auth state and router will navigate
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Signup
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Task API functions
export const taskAPI = {
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  updateTask: async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Focus Session API functions
export const focusAPI = {
  createSession: async (data) => {
    const response = await api.post('/focus-sessions', data);
    return response.data;
  },
  getSessions: async (params = {}) => {
    const response = await api.get('/focus-sessions', { params });
    return response.data;
  },
};

// Insights API
export const insightsAPI = {
  getInsights: async () => {
    const response = await api.get('/insights');
    return response.data;
  }
};

export default api;
