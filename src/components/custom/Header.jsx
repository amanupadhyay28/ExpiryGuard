// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Add user profile or other header items here */}
        <span>Welcome, Seller!</span>
      </div>
    </header>
  );
};

export default Header;
