const db = require('../config/db');

const getBlogs = async (req, res) => {
  try {
    const blogs = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(blogs.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, tags, user_id } = req.body;
    const insertQuery = 'INSERT INTO blogs (title, content, tags, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const newBlog = await db.query(insertQuery, [title, content, tags, user_id]);
    res.json(newBlog.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating blog" });
  }
};

// ✅ Define the deleteBlog function
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Make sure it's properly exported
module.exports = {
  getBlogs,
  createBlog,
  deleteBlog
};