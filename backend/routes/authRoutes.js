const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pool = require('../config/db'); // PostgreSQL connection
const router = express.Router();

// Secret Key for JWT (Move to .env in production)
const JWT_SECRET = "your_jwt_secret_key";

// User Registration (Signup)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists (either via Google or Email signup)
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userCheck.rows.length > 0) {
      const existingUser = userCheck.rows[0];

      // If user registered via Google, prompt to use Google login
      if (existingUser.google_id) {
        return res.status(400).json({ message: "This email is linked to Google Sign-In. Please log in using Google." });
      } else {
        return res.status(400).json({ message: "User with this email already exists. Please log in instead." });
      }
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!", user: newUser.rows[0] });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.rows[0].id, email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update User Profile
router.post('/update-profile', async (req, res) => {
    const { userId, mobile, userType, skills, country, city, userPhoto } = req.body;

    try {
        await pool.query(
            `UPDATE users SET mobile = $1, userType = $2, skills = $3, country = $4, city = $5, userPhoto = $6 WHERE id = $7`,
            [mobile || null, userType, skills || null, country || null, city || null, userPhoto || null, userId]
        );

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login'
}));

module.exports = router;
