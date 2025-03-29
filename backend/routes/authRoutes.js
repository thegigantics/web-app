const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pool = require('../config/db'); // PostgreSQL connection
const router = express.Router();

// Secret Key for JWT (Move to .env in production)
const JWT_SECRET = "your_jwt_secret_key";

// User Registration (Signup)
router.post('/register', async (req, res) => {
    const { name, email, password, mobile, userType, skills, country, city, userPhoto } = req.body;

    try {
        // Check if user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert User into DB
        const newUser = await pool.query(
            `INSERT INTO users (name, email, password, mobile, userType, skills, country, city, userPhoto)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, name, email`,
            [name, email, hashedPassword, mobile || null, userType, skills || null, country || null, city || null, userPhoto || null]
        );

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser.rows[0].id, email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Server error" });
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
