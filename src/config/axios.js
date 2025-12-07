import axios from 'axios';
import { authUtils } from '@/lib/utils/auth';

// Create a safe reference to localStorage
const getLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
console.log('API Base URL:', baseURL);

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
    const token = authUtils.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle unauthorized responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            authUtils.handleUnauthorized();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
