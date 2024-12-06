import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend URL

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/user/signin`, { email, password }, { withCredentials: true });
  const { token } = response.data;
    localStorage.setItem("token", token);
  return response.data;
};

export const logout = async () => {
  await axios.get(`${API_BASE_URL}/user/signout`, { withCredentials: true });
  toast.success("Logged out successfully");
  localStorage.removeItem("token");
};
