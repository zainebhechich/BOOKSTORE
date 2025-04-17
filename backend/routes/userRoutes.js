const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Example authentication middleware

router.get('/dashboard', authenticateToken, userController.getDashboard); // Get user dashboard data
router.post('/add-book', authenticateToken, userController.addBook); // Add a book to the user's account

module.exports = router;