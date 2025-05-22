import { useAuthStore } from "@/src/store/authStore";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://mockupserver.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

const apiServerInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

apiServerInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export { apiInstance, apiServerInstance };
