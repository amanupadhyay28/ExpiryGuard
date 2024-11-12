// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardListIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const userType = localStorage.getItem("userType");

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <ArchiveIcon className="h-6 w-6" />,
    },
    {
      name: userType === "supplier" ? "Product Request" : "Add/Sell Products",
      path: userType === "supplier" ? "/product_request" : "/add_inventory",
      icon: <ClipboardListIcon className="h-6 w-6" />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ClipboardListIcon className="h-6 w-6" />,
    },
  ];
  const user = localStorage.getItem("userType")?.toUpperCase();
  const formattedUser = user
    ? user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()
    : "";
  return (
    <div className="w-64 h-screen bg-primary text-white flex flex-col ">
      <div className="text-2xl font-bold p-4">{formattedUser} Dashboard</div>
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
