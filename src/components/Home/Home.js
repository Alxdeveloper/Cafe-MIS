import React, { useState, useEffect } from 'react';
import { FaCalendar, FaCog, FaHome, FaUser } from 'react-icons/fa';
import { FaBowlFood, FaChartBar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import New_orders from '../../Pages/New_orders';
import OrdersTable from '../../Pages/OrdersTable'; // Ensure this path is correct
import Settings from '../../Pages/Settings'; // Import the Settings component
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import Leaves from '../../Pages/Leaves';
import StaffRegistrationForm from '../Auth/StaffRegistrationForm';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [adminName, setAdminName] = useState('');
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('adminName');
    setAdminName(name || 'Admin');

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/myproject/orders/');
      setOrders(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateTotals = (orders) => {
    setTotalOrders(orders.length);
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    setTotalRevenue(revenue);
    setChartData({
      labels: ['Total Orders', 'Other Metrics'],
      datasets: [
        {
          data: [totalOrders, 100],
          backgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminName');
    navigate('/admin', { state: { message: 'Logged out successfully' } });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Total Orders Today: {totalOrders}</p>
            <p>Total Revenue Today: ${totalRevenue.toFixed(2)}</p>
          </div>
        );
      case 'orders':
        return (
          <div>
            <New_orders onOrderSubmit={fetchOrders} />
            <OrdersTable orders={orders} />
          </div>
        );
      case 'analytics':
        return (
          <div className='container'>
            <h1>Restaurant Dashboard Analytics</h1>
            <p>View key performance indicators like total orders, revenue, and more.</p>
            <div className='row'>
              <div className='col-md-6'>
                <div className='card p-3'>
                  <h3>Total Orders Breakdown</h3>
                  <Pie data={chartData} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card p-3'>
                  <h3>Cumulative Daily Revenue</h3>
                  <Line data={{
                    labels: ['Day 1', 'Day 2', 'Day 3'],
                    datasets: [{
                      label: 'Revenue',
                      data: [1000, 1500, 2000],
                      fill: false,
                      backgroundColor: '#36A2EB',
                      borderColor: '#36A2EB',
                    }],
                  }} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'leaves':
        return <Leaves/>;
      case 'registerStaff':
        return <StaffRegistrationForm />;
      case 'settings':
        return <Settings />;
      // Render Leaves component
      default:
        
    }
  };

  return (
    <div>
      <div className='bg-dark text-white d-flex justify-content-between align-items-center p-3 position-fixed w-100' style={{ top: 0, zIndex: 1000 }}>
        <h2 className='m-0'>Classic Hotels</h2>
        <p className='m-0'><i>{adminName}</i></p>
      </div>

      <div className='d-flex' style={{ marginTop: '70px' }}>
        <div className='bg-dark vh-100' style={{ position: 'fixed', width: '250px' }}>
          <div className='p-4 text-white'>
            <nav className='nav flex-column'>
              <button onClick={() => setActiveSection('home')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaHome className='me-2' /> Home
              </button>
              <button onClick={() => setActiveSection('orders')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaBowlFood className='me-2' /> New Orders
              </button>
              <button onClick={() => setActiveSection('analytics')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaChartBar className='me-2' /> Dashboard Analytics
              </button>
              <button onClick={() => setActiveSection('leaves')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaCalendar className='me-2' /> Leaves
              </button>
              <button onClick={() => setActiveSection('registerStaff')} className='nav-link text-white d-flex align-items-center mb-3'>
                <FaUser className='me-2' /> Register Staff
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

export default Home;
