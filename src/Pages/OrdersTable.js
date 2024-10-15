import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  return (
    <div>
      <h2>Submitted Orders</h2>
      {orders.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Food Type</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.food_type}</td>
                <td>${order.price}</td>
                <td>
                  {order.image && (
                    <img
                      src={order.image} // Adjust this based on your image storage setup
                      alt={order.food_type}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders submitted yet.</p>
      )}
    </div>
  );
};

export default OrdersTable;
