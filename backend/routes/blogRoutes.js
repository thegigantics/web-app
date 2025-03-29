const express = require('express');
const { getBlogs, createBlog, deleteBlog } = require('../controllers/blogController');
const { verifyToken, isSuperAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// 📌 Fetch all blog posts (Public - No login required)
router.get('/blogs', getBlogs);

// 📌 Create a new blog post (Authenticated Users Only)
router.post('/create', verifyToken, createBlog);

// 📌 Delete a blog post (Super Admin Only)
router.delete('/:id', verifyToken, isSuperAdmin, deleteBlog);

module.exports = router;
