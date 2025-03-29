import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// 📌 Register User
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 📌 Google Login (Redirect to backend)
export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};

// 📌 Check if User is Logged In
export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch {
    return null;
  }
};

// 📌 Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
