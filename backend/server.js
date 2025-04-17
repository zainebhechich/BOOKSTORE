// filepath: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // To parse JSON request bodies

app.use((req, res, next) => {
  console.log("Middleware: Request received", req.method, req.url);
  next();
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'your_mongodb_connection_string';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const orderRoutes = require('./routes/orderRoutes'); // Import orderRoutes

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Mount userRoutes
app.use('/api/orders', orderRoutes); // Mount orderRoutes

// Example route
app.get('/books', (req, res) => {
  console.log("GET /books: Sending hardcoded JSON response");
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: "Hello from the backend!", books: [] });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:5000`);
});
