import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogPost from "./BlogPost";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <BlogPost key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
