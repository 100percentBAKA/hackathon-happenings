import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar({isDarkMode,setIsDarkMode}) {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <nav className={`${!isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link to="/" className="font-bold text-xl">AdGenius</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-baseline space-x-4">
            <Link to="/" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/services" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium relative group">
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>
          <button 
            onClick={toggleDarkMode} 
            className={`mr-4 p-2 rounded-md ${!isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
};

