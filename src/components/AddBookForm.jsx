import React, { useState } from 'react';
import { addBook } from '../api/userApi'; // Import addBook

function AddBookForm() {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    price: '',
    imageUrl: '',
    editions: '',
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      await addBook(bookData, token); // Use addBook directly
      alert('Book added successfully!');
      // Reset the form
      setBookData({
        title: '',
        author: '',
        category: '',
        description: '',
        price: '',
        imageUrl: '',
        editions: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error adding book');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Add a Book</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Add similar input fields for author, category, description, price, imageUrl, and editions */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBookForm;
