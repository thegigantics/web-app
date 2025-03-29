import { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // ✅ Default state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }
        setBlogs(data);
		setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load blogs");
      })
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
