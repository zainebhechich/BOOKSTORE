// filepath: src/components/OrderConfirmation.jsx
import React from 'react';

function OrderConfirmation({ order }) {
  return (
    <div>
      <h2>Order Confirmed!</h2>
      <p>Your order has been placed and will be delivered to: {order.deliveryAddress}</p>
      <p>Total amount: ${order.totalAmount}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
}

export default OrderConfirmation;