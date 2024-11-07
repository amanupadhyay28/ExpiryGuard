// src/components/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Redux/reducers/auth";
import { TailSpin } from "react-loader-spinner";
const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("userType");

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(removeUser());
      navigate("/");
    }, 800);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, {user}!</span>
        <button
          className="bg-slate-300 p-2 hover:bg-slate-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
