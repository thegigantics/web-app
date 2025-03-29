const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
 host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Required for AWS Lightsail PostgreSQL
});

client.connect()
  .then(() => console.log("✅ Connected to AWS Redshift"))
  .catch(err => console.error("❌ Redshift Connection Error:", err));

module.exports = client;
