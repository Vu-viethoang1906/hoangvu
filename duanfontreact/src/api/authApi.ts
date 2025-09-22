import axios from "axios";

const API_URL = "https://3e4e14e26335.ngrok-free.app/api/auth";

export const loginApi = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // chứa accessToken
};