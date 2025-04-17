// filepath: src/components/Cart.jsx
import React, { useState } from 'react';
import { createOrder } from '../api/orderApi';

function Cart({ cartItems, clearCart }) {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const bookIds = cartItems.map((item) => item._id); // Assuming your book objects have an _id property
      const orderData = {
        books: bookIds,
        deliveryAddress: deliveryAddress,
      };

      const order = await createOrder(orderData, token);
      setOrderConfirmation(order);
      clearCart(); // Clear the cart after successful order
    } catch (error) {
      console.error('Error confirming order:', error);
      setError(error.message);
    }
  };

  if (orderConfirmation) {
    return (
      <div>
        <h2>Order Confirmed!</h2>
        <p>Your order has been placed and will be delivered to: {orderConfirmation.deliveryAddress}</p>
        <p>Total amount: ${orderConfirmation.totalAmount}</p>
        <p>Thank you for your purchase!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <label>Delivery Address:</label>
      <input
        type="text"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
      />
      <button onClick={handleConfirmOrder}>Confirm Order</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Cart;