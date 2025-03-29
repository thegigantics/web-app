import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Uses backend URL from .env
  headers: { "Content-Type": "application/json" },
});

// User Authentication APIs
export const loginUser = (userData) => API.post("/auth/login", userData);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const fetchUser = () => API.get("/auth/user");

// Blog APIs
export const fetchPosts = () => API.get("/blogs");
export const createPost = (postData) => API.post("/blogs", postData);
export const deletePost = (postId) => API.delete(`/blogs/${postId}`);

export default API;
