const User = require('../models/User');
const Book = require('../models/Book');

// Get user dashboard data
exports.getDashboard = async (req, res) => {
    console.log("req.user:", req.user); // Add this line
    try {
      const user = await User.findById(req.user.id).populate('books'); // Access userId from req.user.id
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };

// Add a book to the user's account
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, description, price, imageUrl, editions } = req.body;
    const userId = req.user.id; // Assuming you have user info in req.user from middleware

    const newBook = new Book({
      title,
      author,
      category,
      description,
      price,
      imageUrl,
      editions,
      user: userId,
    });

    await newBook.save();

    const user = await User.findByIdAndUpdate(userId, { $push: { books: newBook._id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding book' });
  }
};