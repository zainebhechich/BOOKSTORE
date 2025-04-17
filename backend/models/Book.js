const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  price: Number,
  imageUrl: String,
  editions: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who added the book
});

module.exports = mongoose.model('Book', bookSchema);