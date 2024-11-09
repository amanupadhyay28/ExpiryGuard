// src/components/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Redux/reducers/auth";
import { TailSpin } from "react-loader-spinner";
import { Button } from "../ui/button";
const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("name");
  const formattedUser = user
    ? user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()
    : "";
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
        <span className="text-xl ">
          Welcome, <span className="text-orange-500">{formattedUser}!</span>
        </span>
        <Button onClick={handleLogout} className="hover:bg-slate-700">
          {" "}
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
