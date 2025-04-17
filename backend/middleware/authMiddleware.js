// filepath: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Changed 'user' to 'decoded'
    if (err) {
      console.error("Token verification error:", err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = decoded; // Store the entire decoded token
    next();
  });
};