import React, { useState, useEffect } from 'react';
import { getDashboard } from '../api/userApi'; // Import getDashboard
import AddBookForm from './AddBookForm';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const data = await getDashboard(token); // Use getDashboard directly
        setUserData(data.user);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <p>Loading dashboard data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {userData && (
        <div>
          <p>Welcome, {userData.firstName} {userData.lastName}!</p>
          <h2 className="text-xl font-semibold mt-4 mb-2">Your Books</h2>
          {userData.books && userData.books.length > 0 ? (
            <ul>
              {userData.books.map((book) => (
                <li key={book._id}>{book.title} by {book.author}</li>
              ))}
            </ul>
          ) : (
            <p>No books added yet.</p>
          )}
          <AddBookForm />
        </div>
      )}
    </div>
  );
}

export default Dashboard;