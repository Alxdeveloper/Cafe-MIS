import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStaffLogin = () => {
        navigate('/staff/login');
    };

    const handleAdminLogin = () => {
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center mt-16">
            <h1 className="text-3xl font-bold"><i>Classic Hotels Embu</i></h1>
            <p className="mt-4 color-success">Are you a staff member or an admin?</p>
            <div className="mt-6">
                <button
                    onClick={handleStaffLogin}
                    className="mx-8 rounded-md bg-blue-600 px-12 py-8 text-white hover:bg-yellow-500"
                >
                    Staff 
                </button>
                <button
                    onClick={handleAdminLogin}
                    className="mx-8 rounded-md bg-green-600 px-12 py-8 text-white hover:bg-red-500"
                >
                    Admin 
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
