const db = require('../config/db');

// Function to create the Users table in AWS Redshift
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      google_id VARCHAR(255),
      is_verified BOOLEAN DEFAULT FALSE,
      role VARCHAR(20) DEFAULT 'user'
    );
  `;
  await db.query(query);
};

createUserTable().then(() => console.log("✅ Users table is ready"));

module.exports = {};
