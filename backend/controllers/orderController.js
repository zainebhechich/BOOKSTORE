// filepath: backend/controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { books, deliveryAddress } = req.body;
    const userId = req.user.id; // Assuming you have user info in req.user from middleware

    // Calculate total amount
    let totalAmount = 0;
    for (const bookId of books) {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: `Book not found with ID: ${bookId}` });
      }
      totalAmount += book.price;
    }

    const newOrder = new Order({
      user: userId,
      books: books,
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress,
    });

    await newOrder.save();

    // Update user with the new order
    const user = await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Get a specific order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user').populate('books');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('user').populate('books');
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Confirm an order
exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'confirmed' }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order confirmed successfully', order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming order' });
  }
};