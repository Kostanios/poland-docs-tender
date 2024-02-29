/**
 * axios setup to use mock service
 */

import axios from "axios";
import { useAuthStore } from '@/stores/auth';

const token = localStorage.getItem('token');

const LONG_RUNNING_REQUEST_TIMEOUT = 10000;

const axiosServices = axios.create({
    timeout: LONG_RUNNING_REQUEST_TIMEOUT,
    baseURL: import.meta.env.VITE_API_URL
});
// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
          useAuthStore().logout();
      }
      return Promise.reject(error);
  }
);

export const setJWT = (token: string) => axiosServices.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

token && setJWT(token);

export const clearJWT = () => axiosServices.interceptors.request.clear();

export default axiosServices;
