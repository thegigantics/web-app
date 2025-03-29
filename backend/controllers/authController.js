const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../config/mailer');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  try {
    const insertQuery = 'INSERT INTO users (name, email, password, is_verified) VALUES ($1, $2, $3, $4) RETURNING *';
    await db.query(insertQuery, [name, email, hashedPassword, false]);
    
    await sendVerificationEmail(email, token);
    res.json({ message: "Registration successful. Check your email for verification." });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};
