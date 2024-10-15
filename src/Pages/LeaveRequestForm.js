// LeaveRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LeaveRequestForm = ({ onRequestSubmit }) => {
  const [staffName, setStaffName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/leaves/', {
        staff_name: staffName,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        status: status,
      });
      onRequestSubmit(); // Call the parent function to refresh the leave requests
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  const resetForm = () => {
    setStaffName('');
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setStatus('Pending');
  };

  return (
    <div className="card p-4">
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Staff Name</label>
          <input
            type="text"
            className="form-control"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select
            className="form-select"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
