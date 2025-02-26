import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let userName = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    userName = decodedToken.name;
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/FE_YAKA/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-bgDark shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/FE_YAKA" className="flex items-center space-x-3">
          <span className="self-center text-3xl font-bold whitespace-nowrap text-primary hover:text-primary/80 transition-colors">
            TuxId
          </span>
        </Link>
        
        <button 
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link 
                to="/FE_YAKA" 
                className={`block py-2 px-3 rounded md:p-0 transition-colors ${
                  isActivePath('/FE_YAKA') 
                    ? 'text-white hover:text-white/80' 
                    : 'text-secondary hover:text-secondary/80'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/FE_YAKA/choosefilm" 
                className={`block py-2 px-3 rounded md:p-0 transition-colors ${
                  isActivePath('/FE_YAKA/choosefilm')
                    ? 'text-white hover:text-white/80'
                    : 'text-secondary hover:text-secondary/80'
                }`}
              >
                Pesan Tiket
              </Link>
            </li>
            {token && (
              <>
                <li className="text-white py-2 md:py-0">
                  Welcome, <span className="text-white font-semibold">{userName}</span>
                </li>
                <li>
                  <button 
                    onClick={handleSignOut} 
                    className="w-full md:w-auto px-4 py-2 text-sm font-medium text-secondary hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar