import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

// 📌 Get All Blogs
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// 📌 Create Blog (Requires Auth)
export const createBlog = async (blogData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/create`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 📌 Delete Blog (Admin Only)
export const deleteBlog = async (blogId) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
