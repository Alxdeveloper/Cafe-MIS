import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('username'); 

    // Redirect to the login page with a success message
    navigate('login/', { state: { message: 'Logged out successfully' } });
  }, [navigate]);

  return (
    <div className='container'>
      <h1>Logging out...</h1>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout;
