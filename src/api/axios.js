import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ ATTACH TOKEN TO EVERY REQUEST
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
