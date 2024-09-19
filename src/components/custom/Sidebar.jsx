// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardListIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <ArchiveIcon className="h-6 w-6" />,
    },
    {
      name: "Redistribution",
      path: "/redistribution",
      icon: <ClipboardListIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-primary text-white flex flex-col">
      <div className="text-2xl font-bold p-4">Seller Dashboard</div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-4 hover:bg-orange-600 ${
              location.pathname === item.path ? "bg-orange-600" : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
