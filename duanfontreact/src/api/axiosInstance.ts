import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://3e4e14e26335.ngrok-free.app/api",
});

// Thêm token vào header trước mỗi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;