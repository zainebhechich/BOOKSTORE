// filepath: src/components/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderConfirmationPage() {
  const location = useLocation();
  const { book, userInfo } = location.state || {};

  if (!book || !userInfo) {
    return <p>Error: No book or user information found.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <h2 className="text-xl font-semibold mt-4">Order Details:</h2>
        <p>Book Title: {book.title}</p>
        <h2 className="text-xl font-semibold mt-4">Shipping Information:</h2>
        <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
        <p>Email: {userInfo.email}</p>
        <p>Address: {userInfo.address}</p>
        <p>Phone: {userInfo.phone}</p>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;