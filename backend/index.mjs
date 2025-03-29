import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
dotenv.config();

// ✅ Fix Firebase private key formatting
const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, "\n");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// PostgreSQL Database Connection
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Add this line for SSL
  },
});

// Middleware to Verify Firebase Token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Create Blog Post (Protected)
app.post("/api/blogs", verifyToken, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO blogs (user_id, title, content, tags) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.uid, title, content, tags]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch Blog Posts (Public)
app.get("/api/blogs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Serve Static Files (for Frontend Deployment)
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
