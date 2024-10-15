// Leaves.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/leaves/');
      // Filter only pending requests
      const pendingRequests = response.data.filter(request => request.status === 'Pending');
      setLeaveRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleApproval = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/leaves/${id}/`, { status: 'Approved' });
      fetchLeaveRequests(); // Refresh the leave requests after approval
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/leaves/${id}/`, { status: 'Rejected' });
      fetchLeaveRequests(); // Refresh the leave requests after rejection
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  return (
    <div className="card p-4">
      <h2>Leave Requests for Approval</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map(request => (
              <tr key={request.id}>
                <td>{request.staff_name}</td>
                <td>{request.leave_type}</td>
                <td>{request.start_date}</td>
                <td>{request.end_date}</td>
                <td>{request.status}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleApproval(request.id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleRejection(request.id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No leave requests pending.</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
