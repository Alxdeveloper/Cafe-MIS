import React, { useState, useEffect } from 'react';
import { FaCalendar, FaCog, FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeaveRequestForm from './LeaveRequestForm'; // Import the LeaveRequestForm component

const StaffPanel = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [staffName, setStaffName] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate(); // Add this line to use the navigate function

  useEffect(() => {
    const name = localStorage.getItem('staffName');
    setStaffName(name || 'Staff Member');

    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/leaves/');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('staffName');
    navigate('/login', { state: { message: 'Logged out successfully' } });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <h2>Welcome to the Staff Panel</h2>;
      case 'leaves':
        return (
          <div>
            <LeaveRequestForm onRequestSubmit={fetchLeaveRequests} /> {/* Add the LeaveRequestForm */}
            <h2>Leave Requests</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Leave Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.staff_name}</td>
                    <td>{request.leave_type}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'settings':
        return <h2>Settings</h2>;
      default:
        return <h2>Welcome to the Staff Panel</h2>;
    }
  };

  return (
    <div>
      <div className='bg-dark text-white d-flex justify-content-between align-items-center p-3 position-fixed w-100' style={{ top: 0, zIndex: 1000 }}>
        <h2 className='m-0'>Staff Panel</h2>
        <p className='m-0'><i>{staffName}</i></p>
      </div>

      <div className='d-flex' style={{ marginTop: '70px' }}>
        <div className='bg-dark vh-100' style={{ position: 'fixed', width: '250px' }}>
          <div className='p-4 text-white'>
            <nav className='nav flex-column'>
              <button onClick={() => setActiveSection('home')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaHome className='me-2' /> Home
              </button>
              <button onClick={() => setActiveSection('leaves')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaCalendar className='me-2' /> Leave Requests
              </button>
              <button onClick={() => setActiveSection('settings')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaCog className='me-2' /> Settings
              </button>
              <button onClick={handleLogout} className='btn btn-danger d-flex align-items-center'>
                <FaUser className='me-2' /> Logout
              </button>
            </nav>
          </div>
        </div>

        <div className='container' style={{ marginLeft: '260px', padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StaffPanel;
