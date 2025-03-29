const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to check if user is super admin
exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: "Access Denied. Not a super admin." });
  }
  next();
};
