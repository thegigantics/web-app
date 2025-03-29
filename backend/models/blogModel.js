const db = require('../config/db');

// Function to create the Blogs table in AWS Redshift
const createBlogTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      tags TEXT,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

createBlogTable().then(() => console.log("✅ Blogs table is ready"));

module.exports = {};
