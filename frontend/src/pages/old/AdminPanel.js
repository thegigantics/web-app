import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../services/blogService";
import { getUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "superadmin") {
      navigate("/");
    }
    getBlogs().then(setBlogs);
  }, [user, navigate]);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
