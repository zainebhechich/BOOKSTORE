// filepath: src/api/userApi.js
const API_BASE_URL = 'http://localhost:5000/api/users'; // Update with your backend URL

// Get user dashboard data
export const getDashboard = async (token) => {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

// Add a book to the user's account
export const addBook = async (bookData, token) => {
  const response = await fetch(`${API_BASE_URL}/add-book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) {
    throw new Error('Failed to add book');
  }
  return response.json();
};