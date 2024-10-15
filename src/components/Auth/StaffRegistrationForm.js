import React, { useState } from 'react';
import axios from 'axios';

const StaffRegistrationForm = () => {
  const [staffDetails, setStaffDetails] = useState({
    username: '',
    password: '',
    mobileNumber: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setStaffDetails({
      ...staffDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setSuccessMessage(''); // Reset success message

    try {
      const response = await axios.post('http://localhost:8000/myproject/register/', staffDetails);
      if (response.status === 201) {
        setSuccessMessage('Staff registered successfully!');
        setStaffDetails({
          username: '',
          password: '',
          mobileNumber: '',
        });
      }
    } catch (error) {
      if (error.response) {
        setError('Registration failed: ' + (error.response.data.error || 'Unknown error'));
        console.log(setError)
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <div>
      <h2>Register New Staff</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={staffDetails.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={staffDetails.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={staffDetails.mobileNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register Staff</button>
      </form>
    </div>
  );
};

export default StaffRegistrationForm;
