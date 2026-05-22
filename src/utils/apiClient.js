// src/api/apiClient.jsx
import axios from "axios";

// axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor (token attach)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor (error handle)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.message;

    if (status === 500 || message === "jwt expired") {
      // token expire / invalid
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;