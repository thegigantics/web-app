import React, { useState } from "react";
import { createBlog } from "../services/blogService";
import { getUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: "", content: "", tags: "" });
  const user = getUser();
  const navigate = useNavigate();

  if (!user) {
    toast.error("You must be logged in to create a blog.");
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(blog);
      toast.success("Blog posted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Error creating blog");
    }
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={blog.tags}
          onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
