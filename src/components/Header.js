import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 Refresh state when URL changes

  useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginState);
  }, [location]); // 🔁 Updates state on every route change

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/api/v1/users/logout', {
        withCredentials: true,
      });
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link to={'/'}>
          <Logo w={64} h={55} />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-pl-1">
          <input
            type="text"
            placeholder="search products here...."
            className="w-full outline-none"
          />
          <div className="text-lg w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
