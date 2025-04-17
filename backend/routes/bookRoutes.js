const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { getBooks, createBook } = require('../controllers/bookController');

router.get('/', (req, res) => {
  console.log("bookRoutes: GET / - Reached route handler");
  getBooks(req, res);
});

router.post('/', (req, res) => {
  console.log("bookRoutes: POST / - Reached route handler");
  createBook(req, res);
});

module.exports = router;