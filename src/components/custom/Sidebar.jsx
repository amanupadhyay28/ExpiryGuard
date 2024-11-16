import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardListIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { Button } from "../../components/ui/button";
import Loader from "./Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Redux/reducers/auth";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const userType = localStorage.getItem("userType");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(removeUser());
      navigate("/");
    }, 800);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) {
    return <Loader />;
  }

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
      name: userType === "supplier" ? "" : "My Request",
      path: "/my_request",
      icon:
        userType === "supplier" ? null : (
          <ClipboardListIcon className="h-6 w-6" />
        ),
    },
    {
      name: userType === "supplier" ? "Redistribution" : "",
      path: userType === "supplier" ? "/orders" : "",
      icon:
        userType === "supplier" ? (
          <ClipboardListIcon className="h-6 w-6" />
        ) : null,
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
        {menuItems.map((item) =>
          item.name ? (
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
          ) : null
        )}
      </nav>
      <div
        onClick={handleLogout}
        className="flex text-white justify-center item-center gap-2 mb-10 bg-orange-500 cursor-pointer mx-10 rounded-md p-1 hover:bg-orange-600"
      >
        Logout
        <TbLogout size={30} />
      </div>
    </div>
  );
};

export default Sidebar;
