import React, { useState, useEffect } from 'react';
import axios from 'axios';


const predefinedOrders = {
  foods: [
    { id: 1, name: 'Pizza', price: 12.99 },
    { id: 2, name: 'Burger', price: 9.99 },
    { id: 3, name: 'Pasta', price: 10.99 },
  ],
  drinks: [
    { id: 1, name: 'Coke', price: 1.99 },
    { id: 2, name: 'Water', price: 0.99 },
    { id: 3, name: 'Juice', price: 2.49 },
  ],
};
const NewOrders = ({ onOrderSubmit }) => {
  const [foodType, setFoodType] = useState({

  });
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(''); // State for messages

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('food_type', foodType);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/orders/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage('Order saved successfully!');
        onOrderSubmit(); // Call the function to fetch orders
      }

      setFoodType('');
      setPrice('');
      setImage(null);
    } catch (error) {
      setMessage('Failed to save order. Please try again.');
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <h2>New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="foodType" className="form-label">Food Type</label>
          <input
            type="text"
            id="foodType"
            className="form-control"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Order</button>
      </form>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
};

export default NewOrders;
