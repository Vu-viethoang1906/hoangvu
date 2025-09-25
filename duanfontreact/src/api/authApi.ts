// api/auth.ts
import axios from "axios";

const API_URL = "http://localhost:3005/api"; // URL backend

// Axios instance với interceptor xử lý refresh token
const api = axios.create({
  baseURL: API_URL,
});

// Lưu token vào localStorage
const setTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

// Xóa token khi logout
const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

// Login
export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  const { token, refreshToken } = res.data.data;
  setTokens(token, refreshToken);
  return res.data;
};

// Logout
export const logoutApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Không có token để logout");

  const res = await api.post("/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Xóa token khỏi localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("Type_login");

  return res.data;
};

// Refresh token
export const refreshTokenApi = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Không có refresh token");

  const res = await api.post("/refresh-token", { token: refreshToken });
  const { token: newToken } = res.data.data;
  localStorage.setItem("token", newToken);
  return newToken;
};

// Axios interceptor để tự động refresh token khi gặp 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshTokenApi();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // refresh token fail → logout
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Gửi request kèm token (Authorization header)
export const apiWithAuth = (token?: string) => {
  const t = token || localStorage.getItem("token");
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${t}`,
    },
  });
};
