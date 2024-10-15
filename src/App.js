import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import StaffLogin from './components/Auth/StaffLogin';
import Login from './components/Auth/Login'; // Assuming you have an admin login component
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import New_Orders from './Pages/New_orders';
import Leaves from './Pages/Leaves';
import Logout from './Pages/Logout';
import Settings from './Pages/Settings';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LandingPage />} />  {/* Landing Page */}
                    <Route path='staff/login/' element={<StaffLogin />} />
                    <Route path='admin/login/' element={<Login />} /> {/* Admin Login Page */}
                    <Route path='home/' element={<Home />} />  
                    <Route path='orders/' element={<New_Orders />} />
                    <Route path='leaves/' element={<Leaves />} />
                    <Route path='settings/' element={<Settings />} />
                    <Route path='logout/' element={<Logout />} /> 
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
