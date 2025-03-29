import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => <p key={blog.id}>{blog.title}</p>)
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default Dashboard;
