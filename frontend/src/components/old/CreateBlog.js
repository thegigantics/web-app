import React, { useState } from "react";
import { createBlog } from "../services/blogService";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: "", content: "", tags: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(blog);
      toast.success("Blog posted successfully!");
    } catch (err) {
      toast.error("Error creating blog");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
      <textarea placeholder="Content" onChange={(e) => setBlog({ ...blog, content: e.target.value })}></textarea>
      <input type="text" placeholder="Tags" onChange={(e) => setBlog({ ...blog, tags: e.target.value })} />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlog;
