import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import CircularText from './CircularText';


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token when Navbar loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // update state
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to='/'>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="text-xl font-semibold text-gray-800">NotePad</span>
            <CircularText
              text="DAPETON"
              onHover="speedUp"
              spinDuration={20}
              className="custom-class font-bold ms-5"
            />
          </div>
        </Link>

        {isLoggedIn ? (
          <ProfileInfo onLogout={onLogout} />
        ) : (
          <Link to='/login'>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
