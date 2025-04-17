// filepath: backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, orderController.createOrder); // Create a new order
router.get('/:orderId', authenticateToken, orderController.getOrder); // Get a specific order
router.get('/', authenticateToken, orderController.getOrders); // Get all orders for a user
router.put('/:orderId/confirm', authenticateToken, orderController.confirmOrder); // Confirm an order

module.exports = router;